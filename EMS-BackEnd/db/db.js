import mongoose from "mongoose";
import dotenv from "dotenv";
import grid from 'gridfs-stream';


dotenv.config({path:'./.env'});

// console.log(`Process dotenv ${process.env}`);

let gfs;
let conn;

const ConnectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_LOCAL_URL);
        console.log(`Database is Connected and Running Url ${process.env.MONGO_DB_LOCAL_URL}`)

        conn = mongoose.createConnection(process.env.MONGO_DB_LOCAL_URL);
        // conn = mongoose.connection;
        conn.once('open', () => {
            gfs = grid(conn.db, mongoose.mongo);
            gfs.collection('uploads');
            console.log(`GridFS Initilized ${conn}`);
            
        })
    } catch (error) {
        console.log("Mongo Errorrr",error);
        console.log(`Process dotenv ${process.env.MONGO_DB_LOCAL_URL}`);

        
        
    }
}




export { ConnectToDatabase, gfs};