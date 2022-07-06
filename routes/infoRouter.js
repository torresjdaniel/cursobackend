const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController')

router.get('/infoDatos', infoController.getDatos);
router.get('/info', infoController.get);

module.exports = router;