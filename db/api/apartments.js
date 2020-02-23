const connection = require('../config');

function getAll({id,maxNumberOfBaths,minNumberOfBaths,maxNumberOfRooms,minNumberOfRooms,propertyType, city,minSqft,maxSqft, country,minPrice,maxPrice, page = 1, size = 20}) {
    return new Promise((resolve, reject) => {
        const params = [];
        const query = `Select ap.*   from apartments ap 
        join cities c on ap.city_id = c.id
        join countries cn on cn.id = c.country_id 
        where (${!id ? '1' : (params.push(id), 'ap.id = ? ')})
         and         
         (${!city ? '1' : (params.push(city), ' ap.city_id = ? ')})         
         and 
         (${!country ? '1' : (params.push(country), ' cn.name = ? ')})
         and
         (${!minPrice ? '1' : (params.push(minPrice),'ap.price >= ?')}) 
         and 
         (${!maxPrice ? '1' : (params.push(maxPrice),'ap.price <= ?')}) 
         and
         (${!maxNumberOfRooms ? '1' : (params.push(maxNumberOfRooms),'ap.number_of_room <= ?')}) 
         and  
         (${!minNumberOfRooms ? '1' : (params.push(minNumberOfRooms),'ap.number_of_room >= ?')})
         and
         (${!propertyType ? '1' : (params.push(propertyType),'ap.property_type = ?')})
         and
         (${!minNumberOfBaths ? '1' : (params.push(minNumberOfBaths),'ap.number_of_bath >= ?')})
         and
         (${!maxNumberOfBaths ? '1' : (params.push(maxNumberOfBaths),'ap.number_of_bath <= ?')})
         and
         (${!minSqft ? '1' : (params.push(minSqft),'ap.sqft >= ?')})
         and
         (${!maxSqft ? '1' : (params.push(maxSqft),'ap.sqft <= ?')}) 
         limit ${(page-1)*size}, ${size}`;
        connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results); 
        });
    });
} 

    

function byId(apartmentId){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * from apartments where id = ? `,[apartmentId],(error, results, fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        });
    }); 
}
function getImagesById(apartmentId){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT group_concat(i.url) from apartments a join images i on a.id=i.apartment_id  where a.id = ? `,[apartmentId],(error, results, fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        });
    }); 
}
function addApartment({user_id, address,city_id, price, number_of_room,number_of_bath ,sqft, description, sale_status, availability,property_type, main_image}) {
    const apartmentPromise = new Promise((resolve,reject)=>{
        const query = 
            'insert into apartments (user_id, address, city_id, price, number_of_room, number_of_bath , sqft, description, sale_status, availability, property_type, main_image) values(?,?,?,?,?,?,?,?,?,?,?,?)';
            const params = [user_id, address,city_id, price, number_of_room,number_of_bath ,sqft, description, sale_status, availability,property_type, main_image];
        connection.query(query,params,(error,result,fields)=>{
            if(error) reject(error);
            
            resolve(result.insertId); 
        });     
    });  
    return apartmentPromise;  
}
function addImagesToApartment(apartment_id,imagesArr) {
    return new Promise((resolve,reject)=>{ 
        let data = '';
        imagesArr.forEach(image => data += (`(${apartment_id},${" '" +image.destination+image.filename+ " ' "}),`));        
        data = data.slice(0,data.length-1);
        console.log(`data`, data);
        
        connection.query(`insert into images (apartment_id,url) values ${data}`,(error,results,fields)=>{
            if(error)reject(error);
            resolve(results); 
        })
    })
};

function getApartmentsByUserId(userId) {
    console.log(userId);
    return new Promise((resolve,reject) => { 
        connection.query(`SELECT * FROM realtor.apartments where user_id=?`,[userId],(error,results,fields)=>{
            if(error){
                reject(error);
                return; 
            }
            resolve(results);
        })
    })
}
function getApartmentByStatus(status){
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM realtor.apartments where status=?`,[status],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}
function deleteApartment(id){
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE apartments SET \`status\`= 'removed' where id = ?",[id],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        })
    })
}
function approveApartment(id){
    return new Promise((resolve,reject)=>{
        connection.query("Update apartments SET \`status\` = 'approved' where id = ?",[id],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        })
    })
}

function disapproveApartment(id){
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE apartments SET \`status\` = 'denied' where id = ?",[id],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(results);
        })
    })
}

                    
module.exports = {
    getAll,
    byId,  
    getImagesById,
    addApartment,
    addImagesToApartment,
    getApartmentsByUserId,
    getApartmentByStatus,
    deleteApartment,
    approveApartment,
    disapproveApartment
};

