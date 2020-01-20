const connection = require('../config');

function getAll({id,maxNumberOfBaths,minNumberOfBaths,maxNumberOfRooms,minNumberOfRooms,propertyType, city,minSqft,maxSqft, country,minPrice,maxPrice, page = 1, size = 100}) {
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
         //console.log(query);
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
function addApartment({id, user_id, address,city_id, price, number_of_room,number_of_bath ,sqft, created_on,description, sale_status, availability,property_type, main_image}) {
    const apartmentPromise = new Promise((resolve,reject)=>{
        const query = 
            'insert into apartments (id, user_id, address,city_id, price, number_of_room,number_of_bath ,sqft, created_on,description, sale_status, availability,property_type, main_image) values(default,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const params = [id, user_id, address,city_id, price, number_of_room,number_of_bath ,sqft, created_on,description, sale_status, availability,property_type, main_image];
        connection.query(query,params,(error,result,fields)=>{
            if(error) reject(error);
            resolve(result);
        });     
    });
    return apartmentPromise;
}

                    
module.exports = {
    getAll,
    byId, 
    getImagesById,
    addApartment
};

