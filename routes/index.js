const express = require('express');
const climbersController = require("../controllers/userController");
const router = express.Router();
let storage = {}; //object to store the req.body

router.get('/', (req, res)=>
{
    res.render('index', {title: ''});
});



module.exports = router;