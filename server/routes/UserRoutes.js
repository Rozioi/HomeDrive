const express = require('express');
const router = express.Router();
const uc = require('../controllers/UserController');

router.post('/create-user', uc.CreateLogin);

module.exports = router