import mongoose from 'mongoose';

let singleton;

//Connect to MongoDB
async function connect(){
    console.log("Wait connecting to the database...");
    if(singleton) return singleton;

    try{
        const db = await mongoose.connect(process.env.DB_HOST);
        singleton = db;
        console.log("MongoDB Atlas connected!");
    }catch(e){
        console.log(`Error connecting to MongoDB Atlas : ${e}`);
    }
}

export default connect;