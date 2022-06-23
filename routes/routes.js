const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');
const routesController = require('../controllers/routesController');
const climbersModel = require("../models/climbersModel");
const routesModel = require("../models/routesModel");
const projectsController  = require("../controllers/projectsController")

router.use(authenticationService.authenticateJWT);

// routes display page
router.route('/')
    .get((req, res) => {
        routesModel.getRoutes()
            .then(routes => {
                res.render('routes', {routes: routes, routesJSON: JSON.stringify(routes), groupAdded: false})
            })
    })
    .post(projectsController.addProject)



module.exports = router;





