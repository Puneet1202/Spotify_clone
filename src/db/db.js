import mongoose from "mongoose";    

export async  function connectDB(){
    console.log("load database processing connect database")
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Database connection failed:", error);  
    }
}
