const express = require('express');
var multer  = require('multer');
var router = express.Router();
const { getImagesById,
        getAll,
        byId,
        addApartment,
        addImagesToApartment,
        getApartmentsByUserId,
         } = require('../db/api/apartments');

const storage = multer.diskStorage({
    destination:'images/apartment/',
    filename:function(req,file,cbFunc){
        cbFunc(null,file.originalname)
    }
})
const upload = multer({ storage:storage });
 
router.get('/',function(req,res,next){
    console.log('cookies', req.query); 
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

router.get('/users/:userId',function(req,res,next){
    console.log('by user id',req.params.userId);
    getApartmentsByUserId(req.params.userId)
    .then(apartments => {res.status(200).json(apartments);console.log(apartments)})
    .catch(error => res.status(500).json({error:error.message}));
});


// router.post()

router.post('/',upload.array('images',5),async function(req,res,next){
    try{
        console.log('req.file',req.files); 
        console.log('req.body',req.body);
        const main_image = req.files[0].destination+req.files[0].originalname;
        const images = req.files.slice(1); 
        console.log('images',images);
        console.log('main_image',main_image);
        const {user_id,address,price,sale_status,number_of_bath,number_of_room,description,availability,status,property_type,sqft,city_id} = req.body;
        const apartmentId = await addApartment({user_id,address,price,sale_status,number_of_bath,number_of_room,description,availability,status,property_type,sqft,city_id,main_image});
        const addImages = await addImagesToApartment(apartmentId,images);
        res.status(201).json({id: apartmentId});
    }catch(error){
        throw new Error(`posting new apartment failed with ${error.message}`);
    } 
})  
module.exports = router;  