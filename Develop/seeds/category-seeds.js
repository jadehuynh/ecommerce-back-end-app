const { Category } = require('../models');
const sequelize = require('../config/connection');

const categoryData = [
  {
    category_name: 'Shirts',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    category_name: 'Shorts',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
  {
    category_name: 'Music',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    category_name: 'Hats',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    category_name: 'Shoes',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
