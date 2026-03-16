import mongoose from 'mongoose'

const musicSchema = new mongoose.Schema({
    uri:{
        type:String,
       
    },
    title:{
        type:String,
        
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    album:{
        type :String,
        
    },
   
 
    audioFile:{
        type:String,
        
    },
    
})
const Music = mongoose.model("Music",musicSchema)

export default Music