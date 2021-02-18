"use strict";

const ExecuteMysqlQueries = require('../utilities/ExecuteMysqlQueries');


class User  extends ExecuteMysqlQueries {

    #sql_query="";
    #form_query_values={};
    #filters={};
    
    constructor(post_put_values={}, filters={},nestTable=true,timeout=1800){        
        super(nestTable, timeout);
        this.#form_query_values = post_put_values;
        this.#filters = filters;
    }
    set postOrPutValueObj(valueObj){
        this.#form_query_values=valueObj;
    }
    set filterObj(valueObj){
        this.#filters=valueObj;
    }
    get postOrPutValueObj(){
        return this.#form_query_values;
    }
    get filterObj(){
        return this.#filters;
    }
        
    async insertUser(){
        this.#sql_query= `INSERT INTO users SET ?`;
        // this.#sql_query= `SELECT * FROM users`;

        this.set_sqlVal ( this.#sql_query);        
        this.set_postPutValuesObj(this.#form_query_values);
          
        return this._returnResult(await this.execInsertObjStatemet(), 201, "Registration Successfull")
    }

    _returnResult(result, successCode = 200, successMsg = "Operation Successfull"){
        if( result instanceof Object && result.success !== undefined && result.success === false){
            return result;
        }
        else{
            return {
                success : true,
                code : successCode,
                status : 'Data Operation Successfull',
                message: successMsg,
                result : result
            }
        }

        
    }
}


module.exports= User;
