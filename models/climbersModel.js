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

/*
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE UID = ${parseInt(id)}`, function (err, user, fields) {
        if (err) reject (err)
        else if (user.length === 0) {
            resolve ()
        } else {
            resolve(user[0])
        }
    })
})

let updateUser = (userData, id) => new Promise((resolve, reject) => {
    let sql = "UPDATE users SET " +
        "Name = " + db.escape(userData.Name) +
        ", LastName = " + db.escape(userData.LastName) +
        ", Location = " + db.escape(userData.Location) +
        ", email = " + db.escape(userData.email) +
        ", StudyProgramme = " + db.escape(userData.StudyProgramme) +
        ", Description = " + db.escape(userData.StudyProgramme) +
        ", Math = " + db.escape(userData.Math) +
        ", Coding = " + db.escape(userData.Coding) +
        ", Art = " + db.escape(userData.Art) +
        ", Law = " + db.escape(userData.Law) +
        ", Language = " + db.escape(userData.Language) +
        ", Business = " + db.escape(userData.Business) +
        " WHERE UID = " + parseInt(id);


    db.query(sql, function (err, user, fields) {
        if(err) {reject(err);
            console.log(err)}
        else {
            getUsers()
                .then(users => {
                    const UserFromDatabase = users.find(user => {
                        return user.email === userData.email
                    })
                    resolve(UserFromDatabase)
                })

        }

    })
})

 */
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
            // if (checkPassword(registerUser.password, user[0].Password))
            resolve(user[0])
        }
    })
})

/*
//new view call me getting the information from => req.cookies['accessToken'].id

let uploadAvatar = () => new Promise((resolve, reject) => {

})

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
module.exports = {
    getUsers,
    /*
    getUser,
    updateUser,
    */
    addUser,
    signIn,
    /*
    uploadAvatar,
    deleteUser,
     */
}
