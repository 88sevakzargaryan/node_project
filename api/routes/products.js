const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res.status(200).json({
    massage: 'Hangling Get requests to /products'
  });
});

router.post('/', (req, res, next) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
  .save()
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));

  res.status(200).json({
    massage: 'Hangling post requests to /products',
    createdProdact: product
  });
});



/*
router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(200).json({
    massage: 'Hangling post requests to /products',
    createdProdact: product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special Id',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  };
});
*/
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log("From Database", doc);
    res.send(200).json(doc);
  })
  .cetch(err => {
    console.log(err),
    res.sent(500).json({error: err});
  });

});





router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    massage: 'update product'
  });
});


router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    massage: 'deleted product'
  });
});

module.exports = router;
