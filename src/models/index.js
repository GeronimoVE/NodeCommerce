require('../models');
//const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');

Product.belongsToMany(Category, {through: 'ProductsCategories'});
Category.belongsToMany(Product, {through: 'ProductsCategories'});

ProductImage.belongsTo(Product);
Product.hasMany(ProductImage);
