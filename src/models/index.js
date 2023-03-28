require('../models');
const Category = require('../models/Category');
const Cart = require('./Cart');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const User = require('./User');

Product.belongsToMany(Category, {through: 'ProductsCategories'});
Category.belongsToMany(Product, {through: 'ProductsCategories'});

ProductImage.belongsTo(Product);
Product.hasMany(ProductImage);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

