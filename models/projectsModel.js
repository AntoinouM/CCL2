const db = require('../services/database.js').config;
const authenticationService = require("../services/authentication");
const bcrypt = require("bcrypt");

let getProjects = () => new Promise((resolve, reject) => {
    db.query("SELECT * from projects", function (err, routes, fields) {
        if (err) reject (err);
        resolve(routes)
    })
})

let getLastProject = () => new Promise ((resolve, reject) => {
    db.query("SELECT * from projects", function (err, route, fields) {
        if (err) reject (err);
        resolve(route[route.length - 1])
    })
})

let joinProject = (GID, RID) => new Promise ((resolve, reject) => {
    let sql = "INSERT INTO user2project (FK_GID, FK_PID) VALUES ( " + GID +", " + RID + ")";
    db.query(sql, function(err, final, fields) {
        if (err) reject (err);
        resolve(final)
    })
})

// INSERT INTO `projects` (`PID`, `FK_RID`, `Date`, `Time`) VALUES (NULL, '5', '20/12/14', NULL);
let addProject = (newGroup) => new Promise(async function(resolve, reject) {
    let sql = "INSERT INTO projects (FK_RID, Date, Time) VALUES (" + db.escape(newGroup.RID) + ", " +
        db.escape(newGroup.Date) + ", " + db.escape(newGroup.Time) + ")";
    db.query(sql, function (err, route, fields) {
        if (err) reject (err);
        resolve(route)
    })
})


module.exports = {
    getProjects,
    addProject,
    getLastProject,
    joinProject,
}