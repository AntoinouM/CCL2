const projectsModel = require("../models/projectsModel");
const db = require('../services/database.js').config;
const authenticationService = require("../services/authentication");
const routesModel = require('../models/routesModel');

function addProject (req, res) {
    projectsModel.addProject(req.body)
        .then(routes => {
            getLastProject(req, res)
        })
        .catch(err => res.sendStatus(500))
}

function getLastProject (req, res, next) {
    projectsModel.getLastProject()
        .then (route => {
            joinProject(req, res, route.PID)
        })
        .catch(err => res.sendStatus(500))
}

function joinProject (req, res, projectID) {
    projectsModel.joinProject(req.user.id, projectID)
        .then (final => {
            routesModel.getRoutes()
                .then(routes => {
                    res.render('routes', {routes: routes, routesJSON: JSON.stringify(routes), groupAdded: true})
                })
        })
}

module.exports = {
    addProject,
    getLastProject,
}