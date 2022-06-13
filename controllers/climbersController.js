const climbersModel = require("../models/climbersModel");
const uuid = require('uuid');
const db = require('../services/database.js').config;
const {dirname} = require('path');
const authenticationService = require("../services/authentication");
const mainDir = dirname(require.main.filename)


function getUsers(req, res, next) {
    climbersModel.getUsers()
        .then(users => {
            console.log(users)
            res.render('climbers', {users})
        }) //shortcut to write arrow function
        .catch(error => res.sendStatus(500))
}
/*

function getUser (req, res, next) {
    userModel.getUser(req.params.id)
        .then(user => {
            if (user === undefined) {
                res.render('404')
            } else {
                res.render('user', {user})
            }
        })

        .catch(error => res.sendStatus(500))
}

function editUser (req, res, send) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(error => res.sendStatus(500))
}

function updateUser (req, res, send) {
    userModel.updateUser(req.body, req.params.id)
        .then(user => {res.render('user', {user}); console.log(user)})
        .catch(error => res.sendStatus(500))
}


 */
function addUser (req, res, send) {
    climbersModel.addUser(req.body)
        .then(user => {
            if (user === undefined) {
                res.send('This email already exists')
            } else {
                // add cookie
                authenticationService.authenticateUser(req.body, user, res)
            }
        })
        .catch(error => res.sendStatus(500))
}

function signIn (req, res, send) {
    climbersModel.signIn(req.body)
        //.then(user => res.redirect('/users/' + user.UID))
        .then(user => {
            authenticationService.authenticateUser(req.body, user, res)
        })     //error
        .catch(error => res.sendStatus(500))
}
/*
function uploadAvatar (req, res, send) {
    let avatar;
    let uploadPath;

    if (!req.files) return res.status(500).send('No files were uploaded.')
    avatar = req.files.avatar;
    let randomName = uuid.v4() + avatar.name;
    uploadPath = mainDir + '/public/uploads/' + randomName;

    let sql = "UPDATE users SET Picture = " + db.escape(randomName) + " WHERE users.UID = " + req.params.id;
    db.query(sql, function (err, user, fields) {
        if (err) return res.status(500).send(err);
        console.log(err)
        // mv() function to move into folder
        avatar.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            res.redirect('/users/' + req.params.id + '/edit')
        })
    })
}

function deleteUser (req, res, send) {
    userModel.deleteUser(req.params.id)
        .then(user => res.redirect('/users/'))
        .catch(error => res.sendStatus(400))
}
*/

function getMe(req, res, send) {
    let cookieId = authenticationService.getCookieInfo(req.cookies).id;
    console.log(cookieId)
    climbersModel.getMe(cookieId)
        .then(user => {
            res.render('me', {user})
        })
}

module.exports = {
    getUsers,
    /*
    getUser,
    editUser,
    updateUser,
    */
    addUser,
    signIn,
    /*
    uploadAvatar,
    deleteUser,
    */
    getMe,
}
