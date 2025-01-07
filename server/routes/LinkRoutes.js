const express = require('express');
const router = express.Router();
const LinkController = require('../controllers/LinkController');

router.post('/link/create', LinkController.CreateLink);
router.delete("/link/:linkId", LinkController.DeleteLink);
router.put("/link/:linkId", LinkController.UpdateLink);

module.exports  = router;