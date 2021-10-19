const router=require('express').Router();
const {isUser}=require('../middlewares/guard');
const { housingValidation } = require('../middlewares/validation');
const {createHousing, getAllHousings}=require('../services/housingService')

router.get('/create',isUser(),(req,res)=>{
    try {
        res.render('housing/create',{title:'Create Offer',user:req.user})
    } catch (error) {
        res.render('404',{title:'Not Found'});
    }
});

router.post('/create',isUser(),housingValidation('housing/create','Create Offer'),async (req,res)=>{
    try {
        console.log(req.body)
        const{name,type,year,city,image,description,pieces}=req.body;
        const housing={
            name:name.trim(),
            type,
            year:Number(year),
            city:city.trim(),
            image,
            description:description.trim(),
            pieces:Number(pieces),
            owner:req.user._id
        }
        await createHousing(housing);
        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.render('404',{title:'Not Found'});
    }
});


module.exports=router;