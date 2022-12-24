require('dotenv').config();
const express=require('express');
const port=9000;
//express-session
const session=require('express-session');
//db
const db=require('./config/mongoose')
//passport-:
const passport=require('passport');
const passportJwt=require('./config/passport-jwt-strategy');
const GoogleStrategy=require('./config/passport-google-oauth20');


const app=express();

app.use(express.json());
app.use(session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());





app.use('/',require('./routes'))



app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})