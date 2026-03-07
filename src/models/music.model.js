import mongoose from 'mongoose'

const musicSchema = new mongoose.Schema({
    uri:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    album:{
        type:String,
        required:true
    },
   
 
    audioFile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    
})
const Music = mongoose.model("Music",musicSchema)

export default Music