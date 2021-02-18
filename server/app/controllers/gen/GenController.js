"use strict";
let User = require('../../model/User')
// let Validator = require('validatorjs');

// console.log(Validator);

class GenController {
    #req;
    #res;
    constructor(req,res){
        this.#req= req;
        this.#res= res;
    }

    _returnMsg(success=false,code=403, msg, obj={}){

        let record = {
            success: success,
            code: code,
            msg: (msg != null) ? msg : "Undefined Message ( This error/Success Message is not defined)",
        }
        if(success === true){
            record.datas = (Object.keys(obj).length === 0)? "results are not mentioned":  obj ;
        }
        else{
            record.errors = (Object.keys(obj).length === 0)? "Errors not mentioned" :  obj ;
        }

        return record;
    }

    // _controllerFailed(errObj){
    //     console.log(errObj.errors)
    //     return {
    //         success:false,
    //         code:422,
    //         msg:'validation failed',
    //         errors: errObj
    //     }
    // }
    // _controllerSuccess(dataObj={}){
    //     console.log(dataObj)
    //     return {
    //         success:true,
    //         code:200,
    //         msg:'validation Success',
    //         datas: {}
    //     }
    // }
    _signupPostDatas(){
        return {
            first_name: this.#req.body.first_name,
            last_name: this.#req.body.last_name,
            email: this.#req.body.email,
            password: this.#req.body.password,
            country_id: this.#req.body.country_id
        }
    }
    async signup(){  
        const user = new User(this._signupPostDatas(), {}, true, 18000);       
        const record= await user.insertUser();
        // console.log(record);
        console.log("inside Controller");
        return record;
        return this._returnMsg(true, 201, 'Registered Successfully',{
            insert_id:10
        });
    }
}


module.exports= GenController;
