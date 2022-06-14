const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');

//router.use(authenticationService.authenticateJWT);

module.exports = router;

const routesController = require('../controllers/routesController');

