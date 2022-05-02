const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productTag: {
      type: DataTypes.INTERGER,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
