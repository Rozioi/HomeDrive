const express = require('express');
const router = express.Router();
const LinkController = require('../controllers/LinkController');

router.post('/link/create', LinkController.CreateLink);
router.delete("/link/:linkId", LinkController.DeleteLink);
router.put("/link/:linkId", LinkController.UpdateLink);
router.get("/link/file/:fileId", LinkController.GetLinksForFile);
router.get("/link/:linkId", LinkController.GetLinkById);
module.exports  = router;