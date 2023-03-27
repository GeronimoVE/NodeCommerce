const { getAll, create, remove } = require('../controllers/productImage.controllers');
// const { getAll, create, getOne, remove, update } = require('../controllers/productImage.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const productImageRouter = express.Router();

productImageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single("image"), create);

productImageRouter.route('/:id')
    .delete(verifyJWT, remove);
/*    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);
*/
module.exports = productImageRouter;