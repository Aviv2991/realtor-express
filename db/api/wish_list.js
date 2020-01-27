const connection = require('../config');

function getWishListApartmentsByUserId(userId) {
    console.log(userId);
    return new Promise((resolve,reject) => {
        connection.query(`select A.id,A.address,A.city_id,A.price,A.number_of_bath,A.number_of_room,A.sqft,A.\`description\`,A.sale_status,A.availability,A.property_type,A.main_image,W.user_id
        from apartments A join wish_list W on A.id = W.apartment_id where W.user_id =?`,[userId],(error,results,fields)=>{
            if(error){
                reject(error);
                return;
            }
            console.log(results)
            resolve(results);
        })
    })
};
function addApartmentToWishList(user_id,apartment_id){
    return new Promise((resolve,reject)=>{
        const query = `insert into wish_list (user_id,apartment_id) values (?,?)`;
        const params = [user_id,apartment_id];
        connection.query(query,params,(error,result,fields)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(result);
        })
    })
}
module.exports = {
    getWishListApartmentsByUserId,
    addApartmentToWishList
}