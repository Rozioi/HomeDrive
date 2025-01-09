import express from 'express';
import {UserController} from '../controllers/UserController.js'
const router = express.Router();

router.post('/create-user', UserController.CreateLogin);

export default router