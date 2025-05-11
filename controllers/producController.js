const { readData, writeData } = require('../utils/dataHelpers');

module.exports = {
  getProducts: (req, res) => {
    const products = readData('products');
    res.json(products);
  },
  
  createProduct: (req, res) => {
    const products = readData('products');
    const newProduct = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    writeData('products', [...products, newProduct]);
    res.status(201).json(newProduct);
  }
};