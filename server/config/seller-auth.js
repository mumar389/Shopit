const Seller=require('../models/seller');
const bcrypt=require('bcrypt');

module.exports.authenticateSeller=async(req,res,next)=>{
let encryptedId=res.cookie('seller');
bcrypt.compare()
}