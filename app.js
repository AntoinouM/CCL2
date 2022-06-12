const express = require("express")
const app = express();
const port = 5000;
const path = require('path')

// bind short path to path to bootstrap
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//const db = require('./services/database.js');

// require the module that will allow us to parse the JSON data from the server
const bodyParser = require('body-parser'); // node.js method that replace the js JSON,parse()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// require the node module that read cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Templating engine
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views')); // telling the server where the 'views' are located with the path method
app.set('view engine', 'ejs'); // telling the server what is the name of our view engine

app.use(express.static('public')); // make the directory 'public' accessible to everybody usually contain images, html, css.


// cors and fileUpload are two modules from node use for posting picture
const cors = require('cors');
app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload({createParentPath: true})) // we want to upload a picture, if on upload the path does not exist, we allow the app to create it on its own

const indexRouter = require('./routes/index'); // importing the const from the module index.js in routes
app.use('/', indexRouter);

/*
const indexClimbers = require('./routes/climber');
app.use('/users', indexUsers);
*/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.ejs'))
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});