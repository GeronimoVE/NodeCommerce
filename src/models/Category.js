const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false   // Elimina la creación de datos de 
                        // Fecha y hora de creación y acrualización
});

module.exports = Category;