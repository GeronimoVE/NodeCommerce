const { getAll, movePurchase /*, create, getOne, remove, update */} = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
require('../models');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, movePurchase);
/*
purchaseRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);
*/
module.exports = purchaseRouter;