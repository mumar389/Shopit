const express=require('express');
const router=express.Router();
const cartControl=require('../controller/cart_controller');
const passport=require('passport');


router.post('/add-cart/:id',passport.authenticate('jwt',{session:false}),cartControl.addtoCart);
router.get('/get-cart',passport.authenticate('jwt',{session:false}),cartControl.getCart)
router.post('/remove-item/:id',passport.authenticate('jwt',{session:false}),cartControl.removeItem);


module.exports=router;