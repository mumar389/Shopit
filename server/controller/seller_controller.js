const Seller=require('../models/seller');
const bcrypt=require('bcrypt');
const salt = 10;


module.exports.createSeller=async(req,res)=>{
try {
    const {name,email,password,cp,address}=req.body;
if(!name||!email||!password||!cp||!address){
    console.log("Fields cannot be empty");
    return res.status(301).json({
        message:"No Fields cannot be empty"
    })
}
if(password!==cp){
    return res.status(302).json({
        message:"Both Passwords Should be same"
    })
}

let oldSeller=await Seller.findOne({email:email});
if(!oldSeller){
    bcrypt.hash(password, salt, async(err, hash)=> {
        let newSeller=await Seller.create({
            name,email,address,hash
        });
    })
   
    console.log("Seller Created");
    return res.status(200).json({
        message:"Seller Created"
    })
}else{
    console.log("Seller Already exists with this email");
    return res.status(301).json({
        message:"Seller Already exists with this email"
    })
}
} catch (error) {
    console.log("Error",error);
    return res.status(501).json({
        message:"Internal Server error"
    })
}
}
//login-
module.exports.loginSeller=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let allSeller=await Seller.findOne({email:email});
        if(!allSeller){
            console.log("No Seller exists with this email plzz signup to continue");
            return res.status(200).json({
                message:"Plzz Signup to continue"
            })
        }else{
            bcrypt.compare(password, allSeller.password).then(function(result) {
                if(result){
                    let sellerId=allSeller._id;
                    bcrypt.hash(sellerId,salt,async(err,hash)=>{
                        res.cookie('seller',hash);
                    })
                    return res.status(200).json({
                        message:"Login Sucessfull and plzz keep your token safe"
                    })
                }else{
                    return res.status(422).json({
                        message:"Unauthorized access"
                    })
                }
            });
        }
        
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server error"
        })
    }
}