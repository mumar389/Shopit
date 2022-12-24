const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const Item=mongoose.model('Item',itemSchema);
module.exports=Item;