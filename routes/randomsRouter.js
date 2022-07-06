const express = require('express');
const router = express.Router();
const randomsControllers = require('../controllers/randomsController');

router.get("/randoms?", randomsControllers.get);

module.exports = router;