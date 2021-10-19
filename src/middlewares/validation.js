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
};

const housingValidation=(view,title)=>(req,res,next)=>{
    const {name,year,city,image,description,pieces}=req.body;
    const errors=[];
    if(name.trim().length<6){
        errors.push('The Name should be at least 6 characters')
    }
    if(Number(year)<1850 ||Number(year)>2021){
        errors.push('The Year should be between 1850 and 2021!')
    }
    if(city.trim().length<4){
        errors.push('The City should be at least 4 characters long!')
    }
    if(!/^http[s]*:\/\//.test(image.trim())){
        errors.push('Invalid image Url!')
    }
    if(description.trim().length>60){
        errors.push('The Property Description should be a maximum of 60 characters long.')
    }
    if(Number(pieces)<0 ||Number(pieces)>10){
        errors.push('The Available Pieces should be positive number (from 0 to 10)!')
    }
    if(errors.length>0){
       return res.render(view,{title,errors,housing:req.body});
    }
    next();
};



module.exports = {
    userRegisterValidation,
    housingValidation
}