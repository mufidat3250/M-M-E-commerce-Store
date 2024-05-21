import { Request, RequestHandler} from "express";
import { Readable } from "stream";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, "uploads/");
  },
  fileName: function (req:Request, file:Express.Multer.File, cb:(error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileName = file.originalname.split(".")[0]
    cb(null, fileName + "-" + uniqueSuffix + ".png")
} 
});

const upload = multer({storage:storage})

module.exports = { upload }


