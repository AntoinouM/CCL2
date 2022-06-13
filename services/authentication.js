const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {config: db} = require("./database");

const ACCESS_TOKEN_SECRET = require('../secrets').access_token_secret;


async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

function getCookieInfo(cookie) {
    let sourceData = cookie.accessToken;
    let info;

    try {
        info = jwt.verify(sourceData, ACCESS_TOKEN_SECRET)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            console.log('unauthorized')
        }
        // otherwise, return a bad request error
        console.log('bad request')
    }
    return info;
}

function authenticateUser({username, password}, user, res) {
    /*  for password checking later // not with find // userModel.signIn */
// check if the user exist
    // if (user && checkPassword(password, user.Password))
    if (user) {
        const accessToken = jwt.sign({id: user.GID, name: user.Name}, ACCESS_TOKEN_SECRET);

        res.cookie('accessToken', accessToken); //send a cookie
        res.redirect('home');
    } else {
        res.send('Username or password incorrect.');
    }
}

function authenticateJWT (req, res, next) {
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}


module.exports = {
    authenticateUser,
    authenticateJWT,
    getCookieInfo,
    checkPassword,
}
