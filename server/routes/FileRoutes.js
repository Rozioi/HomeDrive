const express = require('express');
const router = express.Router();
const fc = require('../controllers/FileController');
const upload = require('../config/multerConfig');


router.post('/add-file' , upload.any(), fc.uploadFiles);
router.get('/files' , fc.FileController.GetAllFile);
router.get('/file/:fileId' , fc.FileController.GetFileById);
router.get('/download/:fileId' , fc.FileController.DownloadFileById);
router.delete('/delete/:fileId' , fc.FileController.DeleteFileById);

module.exports = router;