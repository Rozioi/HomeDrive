import express from 'express';
import {uploadFiles,FileController} from '../controllers/FileController.js';

const router = express.Router();
import {upload} from '../config/multerConfig.js';


router.post('/add-file' , upload.any(), uploadFiles);
router.get('/files' , FileController.GetAllFile);
router.get('/file/:fileId' , FileController.GetFileById);
router.get('/download/:fileId' , FileController.DownloadFileById);
router.delete('/delete/:fileId' , FileController.DeleteFileById);

export default router;