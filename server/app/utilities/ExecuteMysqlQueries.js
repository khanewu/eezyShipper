"use strict";

const pool= require('../config/db.js');
// const queryRun= require('../config/db.js');

// console.log(pool);

class ExecuteMysqlQueries  {
    #nest_table ;
    #timeout ;
    
    #sql="" ;    
    #prepared_stmnt_values = [];
    #post_put_values = {};
    #query_type = 0;

    constructor(nestTable=true,timeout=1800){        
        // this.#post_put_values = post_put_values;
        // this.#filters = filters;
        this.#nest_table = nestTable;
        this.#timeout = timeout;
    }
    
    set_sqlVal(value){
        this.#sql=value;
    }
    get_sqlVal(){
        return this.#sql;
    }

    set_preparedStatemetValuesArray(value){
        this.#prepared_stmnt_values=value;
    }
    get_preparedStatemetValuesArray(){
        return this.#prepared_stmnt_values;
    }
    
    set_postPutValuesObj(value){
        this.#post_put_values=value;
    }
    get_postPutValuesObj(){
        return this.#post_put_values;
    }


    resetValues(){
        this.#sql = "";
        this.#post_put_values = {};
        this.#prepared_stmnt_values = [];
        this.#query_type = 0;
    }

    async _query_executer(){
        let queryObj = {  sql: this.#sql, timeout: this.#timeout, nestTable : this.#nest_table };
        let query="";
       
        
        if(this.#query_type === 3){
            // MEANS EXECUTE COMPOSIT UPDATE/INSERT QUERY
            /*
           Composit STATEMENT WOULD BE LOOK LIKE-
                UPDATE table1 as T1, table2 AS T2,
                [INNER JOIN | LEFT JOIN] T1 ON T1.C1 = T2. C1
                SET T1.C2 = T2.C2,  <place-composit-prepared-statement>
                                    -------------------------------------
                WHERE T1.C3=? AND T2.Cn = ? 
            -------------------------------------
            In this case for setting prepared statement for set ? marked values
           replacing <place-composit-prepared-statement> with str
        */
            throw new Error('This feature yet not Implemented. Problems at ExecuteMysqlQueries.js file')
            /*
                FIRST MAKE FORMET #POST_PUT_VALUES INTO PREPARED STATEMENT THEN reform sql
                & add #POST_PUT_VALUES values into #PREPARED_STMNT_VALUES
                THAT'S WHY CALL A METHOD FIRST
            */
           //
           queryObj.sql=this.#sql;
           queryObj.values= this.#prepared_stmnt_values;
           return await  pool.query(queryObj);
        }
        else if(this.#query_type === 2){
            // MEANS EXECUTE INSERT WITH OBJECT VALUES QUERY
            queryObj.values= this.#post_put_values;
            return await pool.query(queryObj);
        }
        else if(this.#query_type === 1){
            // MEANS EXECUTE PREPARED STATEMENT QUERY
            queryObj.values= this.#prepared_stmnt_values;
            return await  pool.query(queryObj);
        }
        else{
            // considered this.#query_type = 0 // MEANS EXECUTE RAW QUERY
            return await  pool.query(queryObj);
        }
    }

    async execRawRuery(){
        try{
            this.#query_type = 0;
            return await this._query_executer();
        }
        catch(err){
            return await this._handling_mysql_err(err);
        }
    }

    async execPreparedStatemet(){        
        try{
            this.#query_type = 1;
            return await this._query_executer();
        }
        catch(err){
            return await this._handling_mysql_err(err);
        }

    }

    async execInsertObjStatemet(){   
        try{
            this.#query_type = 2;
            return await this._query_executer();
        }
        catch(error){
            return await this._handling_mysql_err(error);
        }
        // if(result instanceof Error){
        //     console.log('Error Found');
        //     return await this._handling_mysql_err(result);
        // }
        // else{
        //     return await this._query_executer();
        // }

    }

    async execCompositPostPutQuery(){
         /*
           Composit STATEMENT WOULD BE LOOK LIKE-
                UPDATE table1 as T1, table2 AS T2,
                [INNER JOIN | LEFT JOIN] T1 ON T1.C1 = T2. C1
                SET T1.C2 = T2.C2,  <place-composit-prepared-statement>
                WHERE T1.C3=? AND T2.Cn = ? 
            -------------------------------------
            In this case for setting prepared statement for set ? marked values
           replacing <place-composit-prepared-statement> with str
        */
        try{
            this.#query_type = 3;
            return await this._query_executer();
        }
        catch(err){
            return await this._handling_mysql_err(err);
        }
    }
    _handling_mysql_err(err){
        let error={};
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            error.code=500; error. message = 'Data Server connection was closed.';
        }
        else if (err.code === 'ER_CON_COUNT_ERROR') {
            error.code=500; error. message ='Data Server has too many connections.';
        }
        else if (err.code === 'ECONNREFUSED') {
            error.code=500; error. message ='Data Server connection was refused.' ;
        }
        else if (err.code === 'ER_BAD_DB_ERROR') {
            error.code=500; error. message ='Data Server connection was refused.' ;
        }
        else if (err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            error.code=500; error. message ='Too Long Datas to count table rows!.' ;
        }
        else{
            error.code=503; error. message ='Query Error On Data Server.' ;
        }
        error.success = false;
        error.isFatal = err.fatal;        
        error.status='Database Error';
        error.errors = {
            sqlState : err.sqlState,
            status : err.code,
            errno : err.errno,
            sql : err.sql,
            details: {                
                Full_Message: err.sqlMessage,
                Error_details: err
            }
        };


        return error;
    }
}


module.exports= ExecuteMysqlQueries;
