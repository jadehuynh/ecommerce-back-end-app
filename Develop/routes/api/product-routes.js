const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
  // find all products
  // be sure to include its associated Category and Tag data
router.get('/', async (req, res) => {
  try{
    const allProd = await Product.findAll({include : [{ model : Category }, { model: Tag }]});
    
    res.status(200).json(allProd)
  } catch (err) {
    res.status(400).json(err);
  }

});

// get one product
 // find a single product by its `id`
  // be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try{
    const oneProd = await Product.findByPk(req.params.id, {include : [{ model : Category }, { model: Tag }]});
    
    if(!oneProd) {
      res.status(404).json({ message : 'No product found with this product ID.'});
      return;
    }
    res.status(200).json(oneProd);
    }catch (error) {
    res.status(400).json(error);
    }
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
      .then((product) => {
        if (req.body.tagId.length) {
          const prodTagArr = req.body.tagId.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(prodTagArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((prodTagId) => res.status(200).json(prodTagId))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((prodTag) => {
      // get list of current tag_ids
      const prodTagId = prodTag.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProdTag = req.body.tag_id
        .filter((tag_id) => !prodTagId.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const prodTagRemove = prodTag
        .filter(({ tag_id }) => !req.body.tag_id.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: prodTagRemove } }),
        ProductTag.bulkCreate(newProdTag),
      ]);
    })
    .then((updateProdTag) => res.json("Updated"))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const delProd = await Product.destroy({
      where : {
        id: req.params.id
      }
    });

    if (!delProd) { 
      res.status(404).json({ message : 'No Product with this ID in the Database.'}); 
      return;
    }
    res.status(200).json(delProd);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
