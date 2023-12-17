import mongoose from "mongoose";

//const url = process.env.MONGO_URL;  UNdefined value  of MONGO_URL as not yet configured
//console.log(url);
const connectDb = async () => {
    try {
        const url = process.env.MONGO_URL
        const conn = await mongoose.connect(url)
        console.log(`connected to ${conn.connection.host} `)
        
    } catch (error) {
        
    }
}

export default connectDb;
