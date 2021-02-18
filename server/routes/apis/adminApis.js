// routes/things.js routing file
"use strict";
const express = require("express");

let router = express.Router();


router.route('/registration/:id')
    // .post( Middlie.getPermission, genReq.signup, GenController.register); // E Edit Information of Item . That means if any information not found then it will be created.
    .post( genReq.signup, GenController.register); // E Edit Information of Item . That means if any information not found then it will be created.


///--------------------------Exporting Module---------------------------------
module.exports=router;