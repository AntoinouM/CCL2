const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');
const climberModel = require('../models/climbersModel')

//router.use(authenticationService.authenticateJWT);

module.exports = router;

const climbersController = require('../controllers/climbersController');
router.get('/', climbersController.getUsers);


router.post('/addProject', climbersController.addProject)
router.post('/editSelf', climbersController.uploadAvatar)
router.post('/update', climbersController.updateUser)

router.get('/myprofile', climbersController.getMe);
router.get('/editprofile', climbersController.editMe);
