const db = require('../services/database.js').config;
const authenticationService = require("../services/authentication");



let getRoutes = () => new Promise((resolve, reject) => {
    db.query("SELECT * from routes", function (err, routes, fields) {
        if (err) reject (err);
        resolve(routes)
    })
})


module.exports = {
    getRoutes,
}