const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER, // Podria ser decimal para ventas no exactas: por peso (Kg, Libra), etc
        allowNull: false
    }
    // userId,
    // productId
});

module.exports = Cart;
