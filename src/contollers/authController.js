const router=require('express').Router();
const {isGuest}=require('../middlewares/guard');
const { userRegisterValidation } = require('../middlewares/validation');

router.get('/login',isGuest(),(req,res)=>{
    res.render('auth/login',{title:'Login'})
});

router.post('/login',isGuest(),async (req,res)=>{
    try {
        const {username,password}=req.body;
        await req.auth.login(username.trim().toLowerCase(),password.trim());
        res.redirect('/');
    } catch (error) {
        const errors=[];
        errors.push(error.message)
        res.render('auth/login',{title:'Register',errors});
    }
});

router.get('/register',isGuest(),(req,res)=>{
    res.render('auth/register',{title:'Register'});
});

router.post('/register',isGuest(),userRegisterValidation(),async (req,res)=>{
    try {
        const{name,username,password}=req.body;
        await req.auth.register(name.trim(),username.trim().toLowerCase(),password.trim())
        res.redirect('/');
        
    } catch (error) {
        const errors=[];
        errors.push(error.message)
        res.render('auth/register',{title:'Register',errors});
    }
});

router.get('/logout',(req,res)=>{
    req.auth.logout();
    res.redirect('/');
});

module.exports=router;