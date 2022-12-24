const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../models/user');


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:9000/auth/google/google-home"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if(err){
            console.log("Error in passport-google");
            return cb(err);
        }
        if(!user){
            User.create({
                email:profile.emails[0].value,
                name:profile.displayName,
                googleId:profile.id
            },function(err,users){
                if(err){
                    console.log("Error in passport-google");
                    return cb(err);
                }
                console.log("Google Successfully created user");
                return cb(null, users);
            })
        }
        else{
            // console.log(user);
            // console.log("User already exists");
            return cb(null,user);
        }
   
    });
  }
));
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserial
passport.deserializeUser(function(id,done){
User.findById(id,function(err,users){
    if(err){
        console.log("Error in passport deserial");
        return done(err);
    }
    return done(null,users);
})
});
module.exports=passport;