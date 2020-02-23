const express = require('express');
var router = express.Router();
const { getCitiesByCountryName,getAll , byId } = require('../db/api/countries.js');
router.get('/',function(req,res,next){
    getAll()
        .then(countries=> res.status(200).json({countries}))
        .catch(error=>res.status(500).json({error:error.message}));
});

router.get('/:countryId',function(req,res,next){
    byId(req.params.countryId)
    .then(countries=>res.status(200).json(countries))
    .catch(error=>res.status(500).json({error:error.message}));
});

router.get('/:countryName/cities',function(req,res,next){
    getCitiesByCountryName(req.params.countryName)
    .then(cities=>{res.status(200).json(cities)})
    .catch(error=>res.status(500).json({error:error.message}));
}); 

module.exports = router;