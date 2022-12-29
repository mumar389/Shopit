const User=require('../models/user');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt=require('jsonwebtoken');

//registering the user
module.exports.createUser=async (req,res)=>{
try {
    const{name,phone,email,address,password,cp}=req.body;
    if(password!==cp){
        console.log("Password must be valid and complete");
        return res.status(401).json({
            message:"both password and compelete password must be matching"
        })
    }
    if(!name||!phone||!email||!address||!password||!cp){
        return res.status(501).json({
            message:"Fields cannot be empty"
        })
    }
    let allusers=await User.findOne({email:email});
    if(!allusers){
        bcrypt.hash(password, salt, async(err, hash)=> {
       let newUser=await User.create({
            name,phone,email,address,password:hash
        });
        if(!newUser){
            console.log("Error in creating the user");
            return res.status(501).json({
                message:"Error in creating the user"
            })
        }else{
            return res.status(200).json({
                message:"User registered Sucessfully"
            })
        }
    })
        
    }else{
        console.log("User Already Exists,,plzz login to continue");
        return res.status(301).json({
            message:"User Already Exists,,plzz login to continue"
        })
    }
} catch (error) {
    console.log("Error-->",error);
    return res.status(501).json({
        message:"Internal Server Error"
    })
}
}
//login
module.exports.createSession=async(req,res)=>{
    try {
        let allUsers=await User.findOne({email:req.body.email})
     
        if(!allUsers){
            console.log("Cannot find user");
            return res.status(422).json({
                message:"Unauthorized access"
            })
        }else{
            bcrypt.compare(req.body.password, allUsers.password).then(function(result) {
                // result == true
                if(result){
                    // console.log("Inside true");
                    let token=jwt.sign(allUsers.toJSON(),`${process.env.SECRET}`,{expiresIn:'10000000'});
                    res.cookie('jwt',token)
                    return res.status(200).json({
                        message:"Signin Successfull",
                        data:token
                    })
                }else{
                    console.log("Invalid username or password");
                    return res.status(401).json({
                        message:"Invalid username or password"
                    })
                }
            });
          
        }
        
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }


}

//for verifying the user for react auth-:
module.exports.verifyUser=async (req,res)=>{
    let allUsers=await User.findById(req.user.id);
    let details={
        "name":allUsers.name,
        "email":allUsers.email,
        "phone":allUsers.phone,
        "address":allUsers.address,
        "cart":allUsers.cart,
        "orders":allUsers.order
    };
  return res.send(details);
}

//google login
module.exports.googleHome=async(req,res)=>{
    let token=jwt.sign(req.user.toJSON(),'codial',{expiresIn:'1000000'});
    res.cookie('jwt', token);
    //for frontend
    return res.redirect('http://localhost:3000/');
    // return res.status(200).json({
    //     message:"Auth Success"
    // })
}

//Logout 
module.exports.logout=async (req,res)=>{
      
    res.clearCookie('jwt')

    return res.status(200).json({
        message:"Logout Successs"
    })
}