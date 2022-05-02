const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try{
    const allCat = await Category.findAll({include : [{ model : Product }]});

    res.status(200).json(allCat)
  } catch (err) {
    res.status(400).json(err);
  }
});
 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try{
    const oneCat = await Category.findByPk({include : [{ model : Product }]});
    
    res.status(200).json(allCat)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});
router.get('*', (req,res) => {
  res.send("Welcome to the Ecommerce App")
})

module.exports = router;
