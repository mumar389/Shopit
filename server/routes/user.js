const express=require('express');
const router=express.Router();
const userControl=require('../controller/users_controller');
const passport=require('passport');


router.post('/create-user',userControl.createUser);
router.post('/create-session',userControl.createSession);
router.get('/verify-user',passport.authenticate('jwt', { session: false }),userControl.verifyUser);
//handling google login
router.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));
//google callback url
router.get('/auth/google/google-home',passport.authenticate('google',{
    failureRedirect:'http://localhost:3000/sign-up'}),userControl.googleHome);

router.get('/sign-out',passport.authenticate('jwt',{session:false}),userControl.logout)

module.exports=router;