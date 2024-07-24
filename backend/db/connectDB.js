import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected" + conn);
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

export default connectDB;
