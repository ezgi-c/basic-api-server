const { DataTypes } = require("sequelize");

function makeFood(sequelize) {
  return sequelize.define("Food", {
    name: DataTypes.STRING,
    taste: DataTypes.STRING,
  });
}

module.exports = { makeFood };
