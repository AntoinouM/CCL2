const climbersModel = require("../models/climbersModel");
const uuid = require('uuid');
const db = require('../services/database.js').config;
const {dirname} = require('path');
const authenticationService = require("../services/authentication");
const mainDir = dirname(require.main.filename)


function getUsers(req, res, next) {
    climbersModel.getUsers()
        .then(users => {
            res.render('climbers', {users})
        }) //shortcut to write arrow function
        .catch(error => res.sendStatus(500))
}

/*
function getUser (req, res, next) {
    climbersModel.getUser(req.params.id)
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
    climbersModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(error => res.sendStatus(500))
}

 */

function updateUser (req, res, send) {
    let cookieId = authenticationService.getCookieInfo(req.cookies).id;
    climbersModel.updateUser(req.body, cookieId)
        .then(user => {res.render('me', {user, uploadAvatar: true})})
        .catch(error => {
            res.sendStatus(500);
            console.log(error);
        })
}

function addProject(req, res, next) {
    climbersModel.addProject(req.body)
        .then(/* here add next move call climbersModel...*/)
        .catch()
}

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

function uploadAvatar (req, res, send) {
    let avatar;
    let uploadPath;
    let cookieId = authenticationService.getCookieInfo(req.cookies).id;

    if (!req.files) return res.render('me', {uploadAvatar: false})
    avatar = req.files.avatar;
    let randomName = uuid.v4() + avatar.name;
    uploadPath = mainDir + '/public/uploads/' + randomName;

    let sql = "UPDATE climbers SET avatar = " + db.escape(randomName) + " WHERE climbers.GID = " + cookieId;
    db.query(sql, function (err, user, fields) {
        if (err) return res.status(500).send(err);
        // mv() function to move into folder
        avatar.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            res.redirect('/climbers/myprofile')
        })
    })
}

function getMe(req, res, send) {
    let cookieId = authenticationService.getCookieInfo(req.cookies).id;
    climbersModel.getMe(cookieId)
        .then(user => {
            res.render('me', {user, uploadAvatar: true})
        })
}

function editMe(req, res, send) {
    let cookieId = authenticationService.getCookieInfo(req.cookies).id;
    climbersModel.getMe(cookieId)
        .then(user => {
            res.render('editprofile', {user})
        })
}

module.exports = {
    getUsers,
    addUser,
    signIn,
    uploadAvatar,
    getMe,
    addProject,
    editMe,
    updateUser,
}
