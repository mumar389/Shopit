const express=require('express');
const router=express.Router();
const homeControl=require('../controller/home_controller');

router.get('/',homeControl.home);
router.use('/users',require('./user'));
router.use('/items',require('./item'))
router.use('/cart',require('./carts'));
router.use('/order',require('./orders'));
module.exports=router;