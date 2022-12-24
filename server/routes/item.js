const express=require('express');
const router=express.Router();
const itemControl=require('../controller/item_controller');
const passport=require('passport');

router.post('/add-item',passport.authenticate('jwt', { session: false }),itemControl.addItem);
router.get('/fetch-items',itemControl.getItem);



module.exports=router;