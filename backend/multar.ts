import { Request, RequestHandler} from "express";
import { Readable } from "stream";
const path = require('path')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, "./uploads/");
  },
  filename: function (req:Request, file:Express.Multer.File, cb:(error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = file.originalname.split(".")[0]
    console.log({ filename , file: file.originalname})
    cb(null, filename + "-" + uniqueSuffix + ".png")
} 
});

const upload = multer({
  storage:storage
})

module.exports = { upload }


// const imgconfig = multer.diskStorage({
//   destination:(req:Request, file:Express.Multer.File,callback:(error:Error| null, filename:any)=> void)=>{
//       callback(null,'uploads')
//   },
//   filename:(req:Request, file:Express.Multer.File,callback:(error:Error| null, filename:any)=> void)=>{
//       callback(null, `image-${Date.now()}.${file.originalname}`)
//   }
// })

//image filter
// const upload = multer({
  
//   storage: imgconfig,
//   limits:{fileSize:'1000000'},
//   fileFilter:(req:Request, file:Express.Multer.File,callback:(error:Error| null, filename:any)=> void)=>{
//       const fileType = /jpeg|jpg|png|gif/
//       const mimeType = fileType.test(file.mimetype)
//       const extname = fileType.test(path.extname(file.originalname))
//       if(mimeType && extname){
//           return callback(null, true)
//       }
//       callback(null, 'Give proper file format to upload')
//   }
// })

// module.exports = {upload}