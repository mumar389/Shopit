module.exports.home=async(req,res)=>{
    return res.status(200).json({
        message:"Home Accessed sucessfully"
    });
}