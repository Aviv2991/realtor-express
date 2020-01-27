const connection = require('../config');
function getAll(){
    return new Promise((resolve,reject)=>{
        connection.query(`Select name from countries`,(error,results,fields)=>{
            if(error){
                reject(error)
                return;
            }
            resolve(results);
        })
    })
};
function byId(countryId){
    return new Promise((resolve,reject)=>{
        connection.query(`Select * from countries where id = ?`,[countryId],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results); 
        })
    })
}; 

function getCitiesByCountryName(countryName){
    return new Promise((resolve,reject)=>{
        connection.query(`select cities.name, cities.id from cities join countries on countries.id  =  cities.country_id where countries.name = ?`,[countryName],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        })
    })
}
module.exports={
    getAll,
    byId,
    getCitiesByCountryName
}