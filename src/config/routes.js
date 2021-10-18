
const routesConfig=(app)=>{
    app.get('/',(req,res)=>{
        res.render('home',{title:'Home'})
    })
}

module.exports=routesConfig;