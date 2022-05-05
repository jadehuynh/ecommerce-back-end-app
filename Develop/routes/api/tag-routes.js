const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagResults = await Tag.findAll({
      include : [{ model : Product }],
    });
    
    res.status(200).json(tagResults);
  } catch (error) {
    res.status(500).json(error);
  }
});
 // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const aTag = await Tag.findByPk(req.params.id,  {
      include : [{ model : Product }]
    });

    if (!aTag) {
      res.status(404).json({ message : `No ID for these Tags in database.`})
    }
    res.status(200).json(aTag);
  } catch (error) {
    res.status(500).json(error);
  }
});
 // create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name : req.body.tag_name,
      product : req.body.product
    });
    res.status(200).json(createTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where : {
        id : req.params.id
      }
    });
    if (!updateTag[0]) {
      res.status(404).json({ message : `No data found for ID in database.`})
    }
    res.status(200).json(updateTag)
  } catch (error) {
    res.status(500).json(error);
  }
});
 // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where : {
        id: req.params.id
      }
    });

    if (!deleteTag) {
      res.status(404).json({ message : `No data found for ID in database to remove.`}); 
      return;
    }
    res.status(200).json({ message :  `Deleted ${deleteTag} from tag` })
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
