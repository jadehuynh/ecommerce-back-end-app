const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const sequelize = require('../../config/connection');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

router.get('/', (req,res) => {
    res.send("hello")
  })

router.get('*', (req,res) => {
    res.send("yoyoyo")
  })
module.exports = router;
