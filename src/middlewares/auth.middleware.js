import jwt from "jsonwebtoken";


export const authMiddleware = (role)=>{
    return (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decodedToken= jwt.verify(token,process.env.JWT_SCERET)
        if(decodedToken.role !== role){
            return res.status(401).json({message:`Access denied. Only ${role} allowed`})
        }
        req.user = decodedToken;
        next()
    }catch(error){
        console.log(error)  
        return res.status(500).json({message:"Internal token"})
    }
}
}
