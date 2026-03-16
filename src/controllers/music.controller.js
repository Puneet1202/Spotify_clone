import MusicModel from "../models/music.model.js";
import { uploadFile } from "../services/storage.service.js";
import AlbumModel from "../models/album.model.js";

  
export async function createMusic(req,res){
    
        
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
          artist:req.user.id,
         })
       res.status(201).json({message:"Music created successfully",music:{
         id:music._id,
         title:music.title,
         uri:music.uri,
         artist:music.artist,
       }})
}

export async function createAlbum(req,res){
    
        const {title,genre,releaseDate,musics}=req.body;
        const file = req.file ;
        if(!file){
            return res.status(400).json({message:"Please upload an album cover"})
        }
        if(!title  || !genre || !releaseDate){
            return res.status(400).json({message:"Please provide all the details"})
        }
                    const existingAlbum = await AlbumModel.findOne({ title });
            if (existingAlbum) {
                return res.status(400).json({ message: "Album with this title already exists" });
            }
        const result = await uploadFile(file.buffer.toString("base64"))

        const album= await AlbumModel.create({
          title,
          artist:req.user.id,
          genre,
          releaseDate,
          coverImage:result.url,
          songs:musics
          
        })
        res.status(201).json({message:"Album created successfully",album:{
          id:album._id,
          title:album.title,
          artist:album.artist,
          genre:album.genre,
          releaseDate:album.releaseDate,
          coverImage:album.coverImage,
          songs: musics
          
        }}) 

   
}

export async function getAllMusic(req,res){
    try{
        const music = await MusicModel.find().populate("artist","-password -role -email -_id -__v");
         res.status(200).json({message:"Music fetched successfully",music})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


