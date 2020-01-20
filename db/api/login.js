const connection = require(`../config`);

function authUser(username,password){
    const userPromise = new Promise((resolve,reject)=>{
        const query='SELECT users.id, first_name, email, password, status, type FROM realtor.users join roles on users.role_id = roles.id where email = ? and password = ?';
        const params=[username,password];
        connection.query(query,params,(error,result,fields)=>{
            if(error) reject(error);
            resolve(result);
        });
    });
    return userPromise;
}
module.exports={authUser}