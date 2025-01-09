import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, 'D:/cloud_files')
    },
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage,
    limits: {fileSize: 50 * 1024 * 1024}
});
