import express from 'express';
import { downloadFile, generateUploadUrl, uploadFile } from '../Controllers/FileController.js';
import upload from '../storage/gridFsStorage.js';


const router = express.Router();

router.post('/generate-upload-url', generateUploadUrl)
router.post('/uploadFile', upload.single('file'), uploadFile)
router.post('/downloadFile', downloadFile)

export default router;