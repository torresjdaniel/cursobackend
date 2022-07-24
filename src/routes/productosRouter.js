const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController')

router.get('/productos-test', productosController.getTest)
router.get('/productos', productosController.get);
router.post('/productos', productosController.post);
router.get('/productos/:id', productosController.getByID);
router.put('/productos/:id', productosController.put);
router.delete('/productos/:id', productosController.del);

module.exports= router;
