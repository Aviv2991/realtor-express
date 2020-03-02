const express = require('express');
const { signUpUser } = require('../db/api/signup');
var crypto = require('crypto');

var router = express.Router();
router.post('/',async function(req,res,next) {
    try{
        let userCurPassword = crypto.pbkdf2Sync(req.body.password, 'realtor', 10000, 64, 'sha512').toString('base64');
        const result = await signUpUser(req.body, userCurPassword);
    }catch(error){
        throw new Error(`you have got a problem mate ${error.message}`);
    } 
})
module.exports=router
  