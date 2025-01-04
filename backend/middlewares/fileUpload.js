import multer from 'multer'
import path from 'path'
import express from 'express'

export const multerRouter = express.Router()

// Creating store in multer
const storage = multer.diskStorage({
    // File destination
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    // File name
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    },
})
// Creating upload function
const upload = multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024 * 1},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif"){
            cb(null, true)
        }
        else{
            cb(null, false)
            return res.status(500).json({message: 'Images only'})
        }
    }
})

export default upload;

