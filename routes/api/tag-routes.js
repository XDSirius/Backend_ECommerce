const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const data = await Tag.findAll({include:[{ model: Product }]});
  console.log(data);
  return res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{include:[Product]})
  .then(data =>{
    res.json(data)
  })
  .catch(err=>{
    res.json(err)
  })
  
});

router.post('/',async (req, res) => {
  // create a new tag
  const newTag = {}
  newTag.tag_name = req.body.tag_name
  Tag.create(newTag)
  .then(data =>{
    res.json(data)
  })
  .catch(err =>{
    res.json(err)
  })
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = {}
    newTag.tag_name = req.body.tag_name
    const tag = await Tag.update(newTag, {where:{id:req.params.id}})
    res.json(tag)
  } catch(error) {
    res.json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where:{id:req.params.id}})
  .then(data =>{
    res.json(data)
  })
  .catch(error =>{
    res.json(error)
  })
});

module.exports = router;
