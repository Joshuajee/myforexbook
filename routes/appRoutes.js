const express = require('express');
const appController = require('./../controllers/appController');

const router = express.Router();

router.get('/symbols', appController.getAllSymbols);
router.get('/sentiments/:symbol/:start/:count', appController.getSentiments);


module.exports = router;

