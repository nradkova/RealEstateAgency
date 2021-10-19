const homeController=require('../contollers/homeController');
const authController=require('../contollers/authController');


const routesConfig=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
}
module.exports=routesConfig;