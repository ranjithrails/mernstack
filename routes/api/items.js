const express = require('express');
const router = express.Router();

//Item Model

const Item = require("../../models/Item");

//Get api/items
//get all items
router.get('/',(req,res) => {
    Item.find().sort({date: -1})
    .then(items => res.json(items))
});


//POST api/items
//Create a post
router.post('/',(req,res) => {
  const newItem = new Item({
      name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});


//Delete api/items/:id
//Delete an item
router.delete('/:id',(req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=>res.json({sucess:true})))
    .catch(err => res.status(404).json({ success : false}))

  });

module.exports = router;