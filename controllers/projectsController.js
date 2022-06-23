const projectsModel = require("../models/projectsModel");
const db = require('../services/database.js').config;
const authenticationService = require("../services/authentication");

function addProject (req, res, send) {
    projectsModel.addProject(req.body)
        .then(route => {
            res.redirect('/routes')
        })
        .catch(err => res.sendStatus(500))
}

function getLastProject (req, res, next) {
    projectsModel.getLastProject()
        .then (route => {
            return route;
        })
        .catch(err => res.sendStatus(500))
}

function joinProject (req, res, send) {
    projectsModel.joinProject()
        .then (final => {
            res.send('Good god')
        })
}

module.exports = {
    addProject,
}