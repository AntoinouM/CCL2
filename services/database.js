const mysql = require('mysql');
const secrets = require('../secrets')

const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: secrets.dbUserName,
    password: secrets.dbPassword,
    database: "cc211036",
});

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database.");
});

module.exports = {config}
