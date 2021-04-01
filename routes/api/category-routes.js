const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
      include: [
          {
              model: Product,
              attributes: ["id", "product_name", "price", "stock", "category_id"]
          } 
      ]
  })
  .then((categoryData) => {
      res.status(200).json(categoryData);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
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
  .then((categoryData) => {
      if (!categoryData) {
          res.status(404).json({message: "No category found with this id!"});
          return;
      }
      res.status(200).json(categoryData);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
      res.status(200).json(newCategory);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
      {
          category_name: req.body.category_name
      },
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then((updatedCategory) => {
      if (!updatedCategory) {
          res.status(404).json({message: "No category found with this id!"});
          return;
      }
      res.status(200).json(updatedCategory);
  })
  .catch((err) => {
      res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
      {
          where: {
              id: req.params.id
          }
      })
      .then((deletedCategory) => {
          if (!deletedCategory) {
              res.status(404).json({message: "No category found with this id!"});
              return;
          }
          res.status(200).json(deletedCategory);
      })
      .catch((err) => {
          res.status(500).json(err);
      })
});

module.exports = router;