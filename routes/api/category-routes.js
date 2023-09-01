const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //promise with error handling
  Category.findAll({include:[Product]})
  .then(data =>{
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id,{include:[Product]})
    res.json(categories)
  } catch (error) {
    res.json(error)
  }
});

router.post('/', (req, res) => {
  const newCategory = {}
  newCategory.category_name = req.body.category_name
  // create a new category
  Category.create(newCategory)
  .then(data =>{
    res.json(data)
  })
  .catch(err =>{
    res.json(err)
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = {}
    newCategory.category_name = req.body.category_name
    const category = await Category.update(newCategory,{where:{id:req.params.id}})
    res.json(category)
  } catch (error) {
    res.json(error)
    
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where:{id:req.params.id}})
  .then(data =>{
    res.json(data)

  })
  .catch(error =>{
    res.json(error)
  })

});

module.exports = router;
