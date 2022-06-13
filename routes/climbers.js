const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');

//router.use(authenticationService.authenticateJWT);

module.exports = router;

const climbersController = require('../controllers/climbersController');
router.get('/', climbersController.getUsers);

router.get('/myprofile', climbersController.getMe);
