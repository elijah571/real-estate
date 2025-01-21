import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("data base is connected successfully", connection.connection.host);
    } catch (error) {
        console.log('error connectiong to data base', error.message);
        process.exit(1);
    }
}