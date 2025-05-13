import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        // console.log("MongoDB URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected succesfully');
        
    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;