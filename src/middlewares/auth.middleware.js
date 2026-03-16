import jwt from "jsonwebtoken";


export const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decodedToken= jwt.verify(token,process.env.JWT_SCERET)
        if(decodedToken.role !== "artist"){
            return res.status(401).json({message:"You dont have permission to create album"})
        }
        req.user = decodedToken;
        next()
    }catch(error){
        console.log(error)  
        return res.status(500).json({message:"Internal server error"})
    }
}