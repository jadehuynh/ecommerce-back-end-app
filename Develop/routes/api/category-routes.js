const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');
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
    const oneCat = await Category.findOne({
      where: {
        id: req.params.id
      }
    });
    
    res.status(200).json(oneCat)
  } catch (err) {
    res.status(500).json(err);
  }
});
 // create a new category
router.post('/', async (req, res) => {
  try {
    const createCat = await Category.create({

      category_name: req.body.category_name
    })
    res.status(200).json(createCat)
  }catch (err) {
    res.status(500).json(err);
  }
});
 // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(catData)
  }catch (err) {
  res.status(400).json(err)
  ;}
});
 // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    res.status(200).json(deleteData)
}catch (err) {
  res.status(400).json(err)
  ;}
});

router.get('*', (req,res) => {
  res.send("Welcome to the Ecommerce App")
})

module.exports = router;
