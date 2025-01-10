import mongoose from "mongoose";
const connectDb = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_ATLAS}`)
        console.log("Mongo DB connected")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;