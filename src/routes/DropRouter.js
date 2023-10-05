const express = require('express');
const router = express.Router();
const DropController = require('../controllers/DropController');

router.get('/get-uri/:dropId', DropController.getUriDrop);
router.post('/getReadyToCollect', DropController.getReadyToCollect);
router.post('/getNearBy', DropController.getNearBy);

module.exports = router;
