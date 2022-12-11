const { DataTypes } = require('sequelize');

function makeClothes(sequelize) {
    return sequelize.define('Clothes', {
        name: DataTypes.STRING,
        color: DataTypes.STRING,
    });
}

module.exports = {makeClothes};