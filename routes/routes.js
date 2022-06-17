const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');
const routesController = require('../controllers/routesController');
const climbersModel = require("../models/climbersModel");
const routesModel = require("../models/routesModel");

//router.use(authenticationService.authenticateJWT);

// routes display page
router.get('/', (req, res) => {
    routesModel.getRoutes()
        .then(routes => {
            res.render('routes', {routes: routes, routesJSON: JSON.stringify(routes)})
        })
})

module.exports = router;





