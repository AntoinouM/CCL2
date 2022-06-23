const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');
const projectsController = require("../controllers/projectsController");

//router.use(authenticationService.authenticateJWT);


module.exports = router;

