const { getAll, create, getOne, remove, update, setProductImags /*, setProductCategories*/ } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

productRouter.route('/:id/images')
    .post(verifyJWT, setProductImags); /*
    .post(verifyJWT, setProductCategories);*/

module.exports = productRouter;