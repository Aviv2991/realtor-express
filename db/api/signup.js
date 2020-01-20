const connection = require(`../config`);
function signUpUser({role_id=2,first_name,last_name,email,phone},password){
    const userPromise = new Promise((resolve,reject)=>{
        const query='insert into users (role_id, first_name, last_name, email, password, phone) values(?,?,?,?,?,?)';
        const params=[role_id,first_name,last_name,email,password,phone];
        connection.query(query,params,(error,result,fields)=>{
            if(error) reject(error);
            resolve(result);
        });
    });
    return userPromise;
}
module.exports={signUpUser}