import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:'./.env'});

// console.log(`Process dotenv ${process.env}`);

const ConnectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_LOCAL_URL);
        console.log(`Database is Connected and Running Url ${process.env.MONGO_DB_LOCAL_URL}`)
    } catch (error) {
        console.log("Mongo Errorrr",error);
        console.log(`Process dotenv ${process.env.MONGO_DB_LOCAL_URL}`);

        
        
    }
}

export default ConnectToDatabase;