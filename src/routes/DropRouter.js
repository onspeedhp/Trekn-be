const express = require('express');
const router = express.Router();
const DropController = require('../controllers/DropController');

router.get('/get-uri', DropController.getUriDrop);

module.exports = router;
