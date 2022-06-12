const express = require("express")
const app = express();
const port = 5000;
const path = require('path')

// define my public folder
app.use(express.static('public'));

// bind short path to path to bootstrap
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});