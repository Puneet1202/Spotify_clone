import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";



export async function registerUser(req,res) {
    console.log("registerUser function start hogya hai ");
    try{
        const {username,email,password,role="user"}= req.body;
        console.log(username,email,password,role);
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
         const isUserAlreadyExist = await UserModel.findOne({
        $or:[{username},{email}]
         })
         if(isUserAlreadyExist){
            return res.status(400).json({message:"User already exist"});
         }
         // const hashedPassword = await bcrypt.hash(password,10);
         const user = await UserModel.create({
            username,
            email,
            password:password,                                            //hashedPassword,
            role
         })
         const token = jwt.sign({ 
            id:user._id,
            role:user.role  
         },process.env.JWT_SCERET,{expiresIn:"1h"})
         res.cookie("token",token)
         return res.status(201).json({message:"User created successfully",user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
         }});
        
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export async function loginUser(req,res){
   console.log("login user function start hogya hai ")
   try{
      const {username,email,password}= req.body;
      const user = await UserModel.findOne({
         $or:[
            {username},
            {email}
         ]
      })
      if(!user){
         return res.status(401).json({
            message:"invaild credentials"
         })
      }
      const isPasswordValid = password === user.password                          //await bcrypt.compare(password,user.password)
      if(!isPasswordValid){
         return res.status(401).json({
            message: "invaild credentials"
         })
      }
      const token = jwt.sign({
         id:user._id,
         role:user.role,

      },process.env.JWT_SCERET)
      res.cookie("token",token)
      res.status(200).json({
         message:"User logged in sucessfully",
         user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
         }
      })
   }catch(error){
      return res.status(500).json({
         message:" server crash "
      })
   }
}
      
  export async function logoutUser(req,res){
   res.clearCookie("token")
   return res.status(200).json({message:"User logged out successfully"})
  }