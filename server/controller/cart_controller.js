const Item = require('../models/item');
const User = require('../models/user');
// const Cart=require('../models/cart');

//Adding items to cart-:
//Each user will have only one cart:
//cart will have an array of items which will contain the id's of all the items that the user has added to cart.
module.exports.addtoCart=async (req,res)=>{
    try {
        let currentItems=await Item.findById(req.params.id);//checking wether the item which has been requested for adding to cart exist or not
    if(!currentItems||currentItems.length===0){
        return res.status(501).json({
            message:"Plzz Select A valid item"
        })
    }
    else{
        // let allCart=await Cart.findOne({user:req.user.id});//checking if the user who is adding the item to cart has already made his cart or not
        let currentUser=await User.findById(req.user.id);//getting details the current logged in user
        if(!currentUser){//the user is making his new cart
            const error=new Error();
            throw error;
        }
        else{
            // allCart.item.push(req.params.id);
            // allCart.save();
            currentUser.cart.push(req.params.id);
            currentUser.save();
            return res.status(200).json({
                message:"Item Added to Cart🎉🎉"
            })
        }
    }
    } catch (error) {
        // console.log("Error");
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }
    
}
//get cart details|| it is handled in users_controller
module.exports.getCart=async(req,res)=>{
   try {
    User.findById(req.user.id).populate('cart').exec(async(err,results)=>{
        if(err){
            const error=new Error();
            throw error;
        }
        if(results.length===0){
            return res.status(301).json({
                message:"Plzz Add something in ur cart"
            })
        }else{
            let tp=0;
            for(let i of results.cart){
                tp+=parseFloat(i.price);
            }
            return res.status(200).json({
                message:"All Your Items",
                data:results,
                totalPrice:tp
            })
        }
    })
    
   } catch (error) {
    console.log(error);
    return res.status(501).json({
        message:"Internal Server Error"
    })
   }
  
}