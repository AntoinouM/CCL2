const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationService = require('../services/authentication');
const climberModel = require('../models/climbersModel')
const climbersController = require('../controllers/climbersController');


router.use(authenticationService.authenticateJWT);

module.exports = router;

router.get('/', climbersController.getUsers);


router.post('/editSelf', climbersController.uploadAvatar)
router.post('/update', climbersController.updateUser)
router.post('/addProject', climbersController.addProject)
router.get('/myprofile', climbersController.getMe);
router.get('/editprofile', climbersController.editMe);
