"use strict";

let Validator = require('validatorjs');

// console.log(Validator);

class GenRequest {
    #req;
    #res;
    constructor(req,res){
        this.#req= req;
        this.#res= res;
    }
    
    _isReq= function(bar='|'){
        let method=this.#req.method;
        const allowed_methods=['PUT','PATCH','DELETE'];
        let required='';
        if(! allowed_methods.includes(method) ){
            required='required';
            if(bar === '|'){
                required = required + bar;
            }
        }
        return required;
    }
    _signupRules(){
        // sometimes When PUT/PATCH/DELETE operation we usually don't need required field.
        // this case we use this.isReq('|' or ""); It's only applied for required field.
        
        return {
            // es_no: 'required|string|min:3|max:45',
            first_name: this._isReq()+'string|min:3|max:45',
            last_name: this._isReq()+'string|min:3|max:45',
            email: this._isReq()+'email|max:45',
            password: this._isReq(''),
            country_id: this._isReq('')
        };
    }
    _validationFailed(errObj){
        return {
            success:false,
            code:422,
            msg:'validation failed',
            errors: errObj
        }
    }
    _validationSuccess(dataObj={}){
        return {
            success:true,
            code:200,
            msg:'validation Success',
            datas: dataObj
        }
    }
    signup(){
        // allowed_method=['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'];
        // var env = process.env.NODE_ENV || 'dev';

        // data= this.#req.body;
        const rules= this._signupRules();      
        // console.log(rules);    
        let validation = new Validator(this.#req.body, rules);
         
        if(validation.fails()){
            return this._validationFailed(validation.errors)
        }
        else{
            return this._validationSuccess('validation Success');
        }
    }
    login(){
         // allowed_method=['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'];

    }
}


module.exports= GenRequest;
