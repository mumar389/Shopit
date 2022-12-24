const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    orderno:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    address:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    totalAmount:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }]
},{
    timestamps:true
});
const Order=mongoose.model('Order',orderSchema);

module.exports=Order;