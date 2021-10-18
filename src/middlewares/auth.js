const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, TOKEN_SECRET, COOKIE_NAME } = require('./config.json')[process.env.NODE_ENV];

const authMiddleware = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register() {

            },
            async login(){

            },
            async logout(){
                res.clearCookie(COOKIE_NAME);
            }
        }

    }
    next();
}

module.exports = authMiddleware;

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const user = jwt.verify(token, TOKEN_SECRET);
            req.user = user;
            //res.locals.user=user; 
        } catch (error) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('auth/login');
            return false;
        }
    }
    return true;
}

function generateToken(user) {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        username: user.username
    }, TOKEN_SECRET);
}

async function register(){

}

async function login(){

}

async function logout(){

}