const express = require('express');
const climbersController = require("../controllers/climbersController");
const climbersModel = require("../models/climbersModel");
const router = express.Router();
let storage = {}; //object to store the req.body

router.get('/', (req, res)=>
{
    res.render('index', {title: 'CCL2 HOMEPAGE'});
});

router.get('/home', (req, res) => {
    climbersModel.getUsers()
        .then(users => {
            res.render('home', {users: users})
        })
})

router.post('/addUser', climbersController.addUser)
router.post('/signIn', climbersController.signIn)
router.get('/logout', (req, res) => {
    res.cookie('accessToken', '', {maxAge: 0}); // changing the max age of the cookie to erase it
    res.redirect('/')
})





module.exports = router;