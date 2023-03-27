const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImage = sequelize.define('productimage', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    filename: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // productId -> Relación 1-N
    
},{
    timestamps: false   // Elimina la creación de datos de 
                        // Fecha y hora de creación y acrualización
});

module.exports = ProductImage;