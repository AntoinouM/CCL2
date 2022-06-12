const express = require('express');
const climbersController = require("../controllers/climbersController");
const router = express.Router();
let storage = {}; //object to store the req.body

router.get('/', (req, res)=>
{
    res.render('index', {title: 'CCL2 HOMEPAGE'});
});



module.exports = router;