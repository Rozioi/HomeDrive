const express = require('express');
const router = express.Router();
const LinkController = require('../controllers/LinkController');

router.post('/link/create', LinkController.CreateLink);

module.exports  = router;