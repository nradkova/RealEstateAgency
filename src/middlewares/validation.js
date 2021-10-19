const userRegisterValidation=()=>(req,res,next)=>{
    const {name,username,password,repass}=req.body;
    const errors=[];
    if(!/^[A-Z][a-z]+[ ][A-Z][a-z]+$/.test(name.trim())){
        errors.push('The name should be in the following format -> (firstname lastname)!')
    }
    if(username.trim().length<5){
        errors.push('The username should be at least 5 characters long!')
    }
    if(password.trim().length<5){
        errors.push('The password should be at least 4 characters long!')
    }
    if(repass.trim()!=password.trim()){
        errors.push('Passwords do not match!')
    }
    if(errors.length>0){
       return res.render('auth/register',{title:'Register',errors});
    }
    next();
}


module.exports = {
    userRegisterValidation
}