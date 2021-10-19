const homeController=require('../contollers/homeController');
const authController=require('../contollers/authController');
const housingController=require('../contollers/housingController');



const routesConfig=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/housing',housingController);

}
module.exports=routesConfig;