const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
    cart:
    [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ]
    ,
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
},{
    timestamps:true
});
const User=mongoose.model('User',userSchema);

module.exports=User;
