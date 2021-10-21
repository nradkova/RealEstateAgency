const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, TOKEN_SECRET, COOKIE_NAME } = require('../config/config.json')[process.env.NODE_ENV];
const{createUser,getUserByUsername}=require('../services/userService')

const authMiddleware = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(name,username,password) {
                const token=await register(name,username,password);
                res.cookie(COOKIE_NAME,token);
            },
            async login(username,password){
                const token=await login(username,password);
                res.cookie(COOKIE_NAME,token);
            },
            logout(){
                res.clearCookie(COOKIE_NAME);
            }
        }

        next();
    }
}

module.exports = authMiddleware;

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const user = jwt.verify(token, TOKEN_SECRET);
            req.user = user;
            res.locals.user=user; 
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

async function register(name,username,password){
    const existing=await getUserByUsername(username);
    if(existing){
        throw new Error('Username already exists!')
    }

    const hashedPassword= await bcrypt.hash(password,SALT_ROUNDS);

    const user=await createUser(name,username,hashedPassword);
    return generateToken(user);
}

async function login(username,password){
     const user=await getUserByUsername(username);
     if(!user){
         throw new Error ('User with such name does not exist!')
     }
     const hasMatch=await bcrypt.compare(password,user.hashedPassword);
     if(!hasMatch){
         throw new Error('Invalid name or password!')
     }
     return generateToken(user);
}