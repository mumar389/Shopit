const Item=require('../models/item');

//add item to db
module.exports.addItem=async(req,res)=>{
    try {
        const {title,desc,price}=req.body;
        if(!title||!desc||!price){
            return res.status(401).json({
                message:"Plzz Fill all the details correctly"
            })
        }
        let newItem=Item.create({
            title,desc,price
        })
        if(!newItem){
            return res.status(422).json({
                message:"Unable to create new Item"
            })
        }else{   
        return res.status(200).json({
            message:"Item Added to db"
        })
    }    
    } catch (error) {
        console.log("Failed to add item ---->>error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }
    
}
//getting the item in home page
module.exports.getItem=async (req,res)=>{
    try {
        let allitems=await Item.find();
        if(!allitems){
            console.log("Error in finding items");
            return res.status(501).json({
                message:"Error in finding items"
            })
        }else{
            return res.status(200).json({
                message:"All Items-:",
                data:allitems
            })
        }
    } catch (error) {
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }
  
}