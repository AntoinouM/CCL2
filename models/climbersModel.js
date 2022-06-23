const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');
const authenticationService = require("../services/authentication");
const {checkPassword} = require("../services/authentication");


// let all the logic into model, the controller only handle the information
let getUsers = () => new Promise((resolve, reject) => {    // getting a promise for managing asynch resolve if a method if all good, reject if error
    db.query("SELECT * from climbers", function (err, users, fields) {
        if (err) reject (err);
        resolve(users)
    })
})

let updateUser = (userData, id) => new Promise((resolve, reject) => {

    let sql = "UPDATE climbers SET " +
        "Name = " + db.escape(userData.Name) +
        ", LastName = " + db.escape(userData.LastName) +
        ", email = " + db.escape(userData.email) +
        " WHERE GID = " + id;


    db.query(sql, function (err, user, fields) {
        if(err) {reject(err);
            console.log(err)}
        else {
            getMe(id)
                .then(user => {
                    resolve(user)
                })
        }
    })
})

//SELECT * from user2project INNER JOIN projects ON projects.PID = user2project.FK_PID INNER JOIN routes ON routes.RID = projects.FK_RID WHERE user2project.FK_GID = 1;
let getAllInfo = (id) => new Promise((resolve, reject) => {
    console.log(id)
    let sql = "SELECT * from user2project INNER JOIN projects ON projects.PID = user2project.FK_PID INNER JOIN routes ON routes.RID = projects.FK_RID WHERE user2project.FK_GID = " + parseInt(id);
    db.query(sql, function (err, infos, fields) {
        if (err) reject(err)
        resolve(infos)
    })
})

let addUser = (newUser) => new Promise(async function(resolve, reject) {
    let sql = "SELECT * FROM climbers WHERE email = " + db.escape(newUser.email)
    let pw = await bcrypt.hash(newUser.Password, 10)
    db.query(sql, function (err, user, fields) {

        if (user.length !== 0) {
            resolve();
        } else {
            let sql2 = "INSERT INTO `climbers` (`Name`, `LastName`, `email`, `Password`) VALUES (" +
                db.escape(newUser.Name) + "," +
                db.escape(newUser.LastName) + "," +
                db.escape(newUser.email) + "," +
                db.escape(pw) + ")"


            db.query(sql2, function (err, newUser, fields) {
                if (err) {
                    reject(err);
                    console.log(err)
                }
                getUsers().then(users => {
                    resolve(users[users.length - 1])
                })

            })
        }
    })
})

let signIn = (registerUser) => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM climbers WHERE email = " +
        db.escape(registerUser.email)
    db.query(sql, function (err, user, fields) {
        if(err) {reject(err);
            console.log(err)}
        else if (user.length === 0) {
            resolve()
        } else {
            resolve(user[0])
        }
    })
})

/*
// DELETE FROM `users` WHERE `users`.`UID` = 8;
let deleteUser = (id) => new Promise((resolve, reject) => {
    let sql = "DELETE FROM users WHERE UID = " + parseInt(id);

    db.query(sql, function (err, user, fields) {
        if(err) {reject(err);
            console.log(err)}
        resolve()
    })
})
*/

let getMe = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM climbers WHERE GID = ${parseInt(id)}`, function (err, user, fields) {
        if (err) reject (err)
        else if (user.length === 0) {
            resolve ()
        } else {
            resolve(user[0])
        }
    })
})

module.exports = {
    getUsers,
    updateUser,
    addUser,
    signIn,
    /*
    deleteUser,
     */
    getAllInfo,
    getMe,
}
