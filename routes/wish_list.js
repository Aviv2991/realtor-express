const express = require('express');
var router = express.Router();

const {
    getWishListApartmentsByUserId,
        addApartmentToWishList
} = require('../db/api/wish_list');

router.get('/:userId',function(req,res,next){
    getWishListApartmentsByUserId(req.params.userId)
    .then(apartments => res.status(200).json(apartments))
    .catch(error => res.status(500).json({error:error.message}))
});

router.post('/',async function(req,res,next){ 
    try{
        const result = await addApartmentToWishList(req.body.userId,req.body.apartmentId);
    }catch(error){
        throw new Error(`adding apartment to wish list declined with ${error.message}`);
    }
})
module.exports = router;  
