const express = require('express');
const { authUser } = require('../db/api/login');
var crypto = require('crypto');

var router = express.Router();
router.post('/', async function (req, res, next) {
    try {
        console.log('login post', req.body);
        let userCurPassword = crypto.pbkdf2Sync(req.body.password, 'realtor', 10000, 64, 'sha512').toString('base64');
        console.log(userCurPassword);
        const result = await authUser(req.body.username, userCurPassword);
        console.log('auth user', result);
        if (result.length == 1) {
            res.cookie('login', JSON.stringify(result[0]), {maxAge: 1000*60*60*24});
            res.status(200).json(result[0]);
        } else {
            res.status(401).json({ status: 401, messge: 'wrong details' }); 
        }
    } catch (error) {
        res.status(500).json({ status: 500, messge: 'Internal server error' });
    }
})
module.exports = router;