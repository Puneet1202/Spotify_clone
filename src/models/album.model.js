import mongoose from "mongoose";

 const albumSchema = new mongoose.Schema({
    title:{
        type:String,
       unique: true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       
    },
    genre:{
        type:String,
       
    },
    releaseDate:{
        type:Date,
       
    },
    coverImage:{
        type:String,
        
    },
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }]
 })
 const Album = mongoose.model("Album",albumSchema)  
 export default Album