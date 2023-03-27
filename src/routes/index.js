const express = require('express');
//const cartRouter = require('./cart.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const productImageRouter = require('./productImage.router');
const userRouter = require('./user.router');
const router = express.Router();
require('../models');


// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
//router.use('/carts', cartRouter)
router.use('/productimages', productImageRouter)


module.exports = router;