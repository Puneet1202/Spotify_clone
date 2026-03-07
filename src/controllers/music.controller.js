import MusicModel from "../models/music.model.js";
import jwt from "jsonwebtoken";
import { uploadFile } from "../services/storage.service.js";

  
export async function createMusic(req,res){
    try{
        // phele token nikalege  cookies m see jo cookies m savehoga login krte hue 
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        // fr token verify krege 

        const decodedToken = jwt.verify(token,process.env.JWT_SCERET)
        // fr check krege ki role match horha hai ya nhi 
        if(decodedToken.role !=="artist"){
            return res.status(401).json({message:"you dont have permission to create music"})
        }
        
        const {title}=req.body;
        const file = req.file ;
        if(!file){
            return res.status(400).json({message:"Please upload a music file"})
        }
        if(!title){
            return res.status(400).json({message:"Please provide a title"})
        }
         const result = await uploadFile(file.buffer.toString("base64"))

         const music= await MusicModel.create({
          uri:result.url,
          title,
          artist:decodedToken.id,
         })
       res.status(201).json({message:"Music created successfully",music:{
         id:music._id,
         title:music.title,
         uri:music.uri,
         artist:music.artist,
       }})
        

    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default {createMusic}