const mysql = require('mysql');
const util = require('util');
require("dotenv").config();


const config = {
    connectionLimit: 20,
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const pool = mysql.createPool(config);
pool.query = util.promisify(pool.query).bind(pool)

module.exports = pool;

    // async function query(queryObj){
    //     var pool  = mysql.createPool(config); 
    //     pool.getConnection(function(err, connection) {
    //     if (err) throw err; // not connected!
    //         connection.query(queryObj, function (error, results, fields) {
    //             // When done with the connection, release it.
    //             connection.release();

    //             if (error) throw error;

    //             return results;
    //         });
    //     });
    //}
    //module.exports = query;


// const promiseQuery = util.promisify(pool.query).bind(pool)
// // const promisePoolEnd = util.promisify(pool.end).bind(pool)

// async function queryRun (queryObj){
//     try{
//         return await promiseQuery(queryObj); // use in async function
//     }
//     catch(err){
//         return err;
//     }
//     // await promisePoolEnd();
    
//     // console.log(result);
//     // return result;
// }

// module.exports = queryRun;

//================================================================

// query = (queryObj)=>{
//     return new Promise((resolve, reject)=>{        
//         pool.query(queryObj,(err,result, fields)=>{
             
//             try{
//                 return resolve(result);
//             }
//             catch(err){

//                 console.log('================================================================');
//                 console.log(err);
//                 console.log('===============================================================');
                
//                 return reject(err);
//             }
//         });
//     });
// };
// module.exports=query;