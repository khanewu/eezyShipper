"use strict";

const GenRequest= require('../Request/Gen/GenReqValidation.js');
const GenController= require('../../app/controllers/gen/GenController');

exports.genApiHandler = {
    signup: async function(req,res){
        
        let errFlag=0;
        let result= {};
        const genReq= new GenRequest(req,res);
        result = await genReq.signup();        
        if(result.success === true ){
            let user= new GenController(req,res);
            result=  await user.signup();      
        }
        
        res.status(result.code).json(result);
    },
    login: function(req,res){

    }
}
