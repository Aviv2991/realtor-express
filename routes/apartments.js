const express = require('express');
var router = express.Router();
const { getImagesById,
        getAll,
        byId,
        addApartment } = require('../db/api/apartments');

router.get('/',function(req,res,next){
    console.log('cookies', req.cookies);
    getAll(req.query)
        .then(apartments=>res.status(200).json({apartments}))
        .catch(error=>res.status(500).json({error:error.message}));
});

router.get('/:apartmentId',function(req,res,next){
    byId(req.params.apartmentId) 
    .then(apartment=>res.status(200).json(apartment))
    .catch(error=>res.status(500).json({error:error.message}));
});

router.get('/:apartmentId/images',function(req,res,next){
    getImagesById(req.params.apartmentId)
    .then(apartment=>res.status(200).json(apartment))
    .catch(error=>res.status(500).json({error:error.message}));
});

router.post('/',async function(req,res,next){
    try{
        const result = await addApartment(req.body);
    }catch(error){
        throw new Error(`you have got a problem mate ${error.message}`);
    }
})
module.exports = router;