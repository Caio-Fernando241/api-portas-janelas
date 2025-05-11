const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { isSeller } = require('../middlewares/authMiddleware');

const salesDB = path.join(__dirname, '../database/sales.json');
const productsDB = path.join(__dirname, '../database/products.json');

// Registrar venda (vendedor/gerente)
router.post('/', isSeller, (req, res) => {
  const { products: productIds, customerId, paymentMethod = 'dinheiro' } = req.body;
  
  if (!productIds || !productIds.length) {
    return res.status(400).json({ error: 'Nenhum produto selecionado' });
  }
  
  const products = JSON.parse(fs.readFileSync(productsDB));
  const sales = JSON.parse(fs.readFileSync(salesDB));
  
  let total = 0;
  const soldProducts = [];
  
  for (const productId of productIds) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: `Produto ${productId} não encontrado` });
    }
    
    if (product.stock <= 0) {
      return res.status(400).json({ error: `Produto ${product.name} sem estoque` });
    }
    
    total += product.price;
    soldProducts.push({
      id: product.id,
      name: product.name,
      price: product.price
    });
    
    // Atualizar estoque
    product.stock -= 1;
  }
  
  const newSale = {
    id: Date.now(),
    sellerId: req.user.id,
    customerId,
    products: soldProducts,
    total,
    paymentMethod,
    date: new Date().toISOString(),
    status: 'concluída'
  };
  
  sales.push(newSale);
  fs.writeFileSync(salesDB, JSON.stringify(sales, null, 2));
  fs.writeFileSync(productsDB, JSON.stringify(products, null, 2));
  
  res.status(201).json(newSale);
});

// Listar vendas (vendedor/gerente)
router.get('/', isSeller, (req, res) => {
  const sales = JSON.parse(fs.readFileSync(salesDB));
  
  if (req.user.role === 'seller') {
    const sellerSales = sales.filter(sale => sale.sellerId === req.user.id);
    return res.json(sellerSales);
  }
  
  res.json(sales);
});

module.exports = router;