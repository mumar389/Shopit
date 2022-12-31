const Order=require('../models/order');
const User=require('../models/user')
module.exports.addOrder=async(req,res)=>{
try {
    User.findById(req.user.id).populate('cart').exec(async(err,results)=>{
        if(err){
            const error=new Error();
            throw error;
        }
        if(results.length===0){
            return res.status(301).json({
                message:"You have not ordered anything yet😢😢"
            })
        }else{
            let s=0;
            results.cart.map((cm)=>{
                s+=parseInt(cm.price)
                // console.log(s);
            })
            let allOrders=await Order.find();
            let l=allOrders.length;
            let orderId=`Shop000${l+1}`;
            let newOrder=await Order.create({
                orderno:orderId,
                user:req.user.id,
                address:results.address,
                paymentMode:req.body.payment,
                totalAmount:s,
                phone:results.phone,
            });
            if(!newOrder){
                const error =new Error();
                throw error;
            }else{
                results.cart.map((ci)=>{
                    newOrder.items.push(ci)
                })
                newOrder.save();
                results.order.push(newOrder.id);
                
                while(results.cart.length!=0){
                    results.cart.pop();
                }
                results.save();
                return res.status(200).json({
                    message:"Your Order is confimed",
                    data:orderId
                })
            }
        }
    })
} catch (error) {
    console.log(error);
    return res.status(501).json({
        message:"Internal Server Error"
    })
}
   
}
//get orders-:
module.exports.getOrder=async(req,res)=>{
    try {
       Order.find({user:req.user._id}).populate('items').exec((err,results)=>{
        return res.status(200).json({
            message:"Your Orders",
            data:results
        })
       })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            message:"Internal Server error"
        })
    }
 
}