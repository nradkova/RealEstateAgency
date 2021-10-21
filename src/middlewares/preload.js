const { getHousingById } = require("../services/housingService")


function preloadHousing(){
    return async (req,res,next)=>{
        try {
            const housing=await getHousingById(req.params.id);
            if(housing){
                req.housing=housing;
            }
        } catch (error) {
            console.error('Database error:' + error.message);
        }
        next();
    }
}

module.exports=preloadHousing;