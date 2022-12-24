const express=require('express');
const passport=require('passport');
const router=express.Router();
const orderControl=require('../controller/order_controller');

router.post('/confirm-order',passport.authenticate('jwt',{session:false}),orderControl.addOrder);


module.exports=router;