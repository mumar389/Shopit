const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
//Create Connection with databases
mongoose.connect(`${process.env.MONGOOSE_URI}`);
const db=mongoose.connection;

//handling the connection
db.on('error',console.error.bind('console','errro in connection with db'));

db.once('open',function(){
    console.log("Successfully Connected To the database");
})
