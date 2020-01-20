const connection = require('../config');

function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('Select * from Customers', (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function byId(customerId) {
    return new Promise((resolve, reject) => {
        console.log('Got parameter: ', customerId);
        connection.query(`Select * from Customers Where CustomerID = '${customerId}'`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    getAll,
    byId
};