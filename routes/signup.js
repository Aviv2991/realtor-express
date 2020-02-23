const express = require('express');
const { signUpUser } = require('../db/api/signup');
var crypto = require('crypto');

var router = express.Router();
router.post('/',async function(req,res,next) {
    console.log('signup post', req.body);

    try{
        let userCurPassword = crypto.pbkdf2Sync(req.body.password, 'realtor', 10000, 64, 'sha512').toString('base64');
        const result = await signUpUser(req.body, userCurPassword);
        console.log('result',result); 
        // if(result.length == 1){

        // }


    }catch(error){
        throw new Error(`you have got a problem mate ${error.message}`);
    }
})
module.exports=router
  