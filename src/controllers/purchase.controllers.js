const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll( {where: {userId: req.user.id}});
    return res.json(results);
});

const movePurchase = catchError(async(req, res) => {
    const productsCart = await Cart.findAll( { 
        where: {userId: req.user.id}, 
    attributes: ['quantity','productId','userId']
    })
    await Purchase.bulkCreate(productsCart);
    await productsCart.destroy({ where: {userId: req.user.id}})
    return res.status(200);
})
/*
const create = catchError(async(req, res) => {
    const result = await Purchase.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Purchase.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});
*/

module.exports = {
    getAll,
    movePurchase /*,
    create,
    getOne,
    remove,
    update*/
}