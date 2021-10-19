const router=require('express').Router();

router.get('/',(req,res)=>{
    console.log(req.user)
    res.render('home/home',{title:'Real Estate Agency',user:req.user})
});


module.exports=router;