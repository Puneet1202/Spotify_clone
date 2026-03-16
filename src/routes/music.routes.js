import express from "express";
import { createMusic  , createAlbum,getAllMusic} from "../controllers/music.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


import multer from "multer";
const router = express.Router();

 const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:1024*1024*5},
 })
router.post("/upload", authMiddleware("artist"),upload.single("music"),createMusic)
router.post("/album",authMiddleware("artist"),upload.single("album"),createAlbum)
router.get("/getall",authMiddleware("user"),getAllMusic)



export default router;