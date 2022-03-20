const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.landPage);
router.get('/symbol/:symbol', viewController.getSentiments);


module.exports = router;
