const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

const getAll = catchError(async(req, res) => {
    const results = await ProductImage.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;
		const filename = req.file.filename;
    const result = await ProductImage.create({ url, filename });
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await ProductImage.findByPk(id);
		if(!image) return res.sendStatus(404);
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', image.filename));
    await image.destroy();
    return res.sendStatus(204);
});
/*
const create = catchError(async(req, res) => {
    const result = await ProductImage.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImage.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ProductImage.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImage.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});
*/
module.exports = {
    getAll,
    create,
    remove /*,
    getOne,
    remove,
    update*/
}