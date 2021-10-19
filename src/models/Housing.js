const {Schema,model}=require('mongoose');

const schema=new Schema({
    name:{
        type:String,
        required:true
    },
    type :{
        type:String,
        enum:['Apartment', 'Villa', 'House'],
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image :{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    pieces :{
        type:Number,
        required:true
    },
    rented :[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    owner :{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=model('Housing',schema);