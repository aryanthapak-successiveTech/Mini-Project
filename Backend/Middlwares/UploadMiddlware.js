import multer from "multer";
import path from "path";
import fs from "fs";



const uploadDir = 'uploads/ebooks';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        const ext=path.extname(file.originalname);
        const fileName=`ebook-${Date.now()}${ext}`
        cb(null,fileName);
    }
});



export const upload=multer({storage});

