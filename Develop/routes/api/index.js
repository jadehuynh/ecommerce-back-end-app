const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

router.get('/', (req,res) => {
    res.send("Welcome to the Ecommerce App")
  })

router.get('*', (req,res) => {
    res.send("Welcome to the Ecommerce App")
  })
module.exports = router;
