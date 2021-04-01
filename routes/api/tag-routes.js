const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
      include: [
          {
              model: Product,
              attributes: ["id", "product_name", "price", "stock", "category_id"]
          }
      ]
  })
  .then((tagData) => {
      res.status(200).json(tagData);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
      where: {
          id: req.params.id
      },
      include: [
          {
              model: Product,
              attributes: ["id", "product_name", "price", "stock", "category_id"]
          }
      ]
  })
  .then((tagData) => {
      if (!tagData) {
          res.status(404).json({message: "No tag found with this id!"});
          return;
      }
      res.status(200).json(tagData);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
      res.status(200).json(newTag);
  })
  .catch((err) => {
      req.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
      {
          tag_name: req.body.tag_name
      },
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then((updatedTag) => {
      if (!updatedTag) {
          res.status(404).json({message: "No tag found with this id!"});
      }
      res.status(200).json(updatedTag);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
      {
          where: {
              id: req.params.id
          }
      })
      .then((deletedTag) => {
          if (!deletedTag) {
              res.status(404).json({message: "No tag found with this id!"});
              return;
          }
          res.status(200).json(deletedTag);
      })
      .catch((err) => {
          res.status(500).json(err);
      })
});

module.exports = router;