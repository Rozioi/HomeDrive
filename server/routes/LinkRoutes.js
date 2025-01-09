import express from 'express';
import {LinkController} from '../controllers/LinkController.js';

const router = express.Router();

router.post('/link/create', LinkController.CreateLink);
router.delete('/link/:linkId', LinkController.DeleteLink);
router.put('/link/:linkId', LinkController.UpdateLink);
router.get('/link/file/:fileId', LinkController.GetLinksForFile);
router.get('/link/:linkId', LinkController.GetLinkById);

export default router;
