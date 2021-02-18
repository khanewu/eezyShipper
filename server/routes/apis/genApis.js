// routes/things.js routing file
"use strict";
const express = require("express");

let router = express.Router();

let handler = require('../../handler/apis/genApisHandlers').genApiHandler;

// console.log(handler);

router.route('/registration')
    // .post( Middlie.getPermission, genReq.signup, GenController.register); // E Edit Information of Item . That means if any information not found then it will be created.
    .post( handler.signup); // E Edit Information of Item . That means if any information not found then it will be created.
    // .post(function(req,res){
    //     res.send('hello World');
    // })

///--------------------------Exporting Module---------------------------------
module.exports=router;