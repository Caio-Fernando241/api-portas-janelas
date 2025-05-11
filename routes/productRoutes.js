const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middlewares/auth');

router.get('/', productController.getAllProducts);
router.post('/', authenticate, productController.createProduct);

const productsDB = path.join(__dirname, '../database/products.json');

// Listar produtos (acesso a todos)
router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsDB));
  res.json(products);
});

// Adicionar produto (apenas gerente)
router.post('/', isManager, (req, res) => {
  const { name, description, price, category, stock, dimensions, material } = req.body;
  
  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }
  
  const products = JSON.parse(fs.readFileSync(productsDB));
  
  const newProduct = {
    id: Date.now(),
    name,
    description: description || '',
    price: parseFloat(price),
    category: category || 'porta',
    stock: parseInt(stock),
    dimensions: dimensions || '0x0',
    material: material || 'madeira',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  fs.writeFileSync(productsDB, JSON.stringify(products, null, 2));
  
  res.status(201).json(newProduct);
});

// Atualizar estoque (gerente/vendedor)
router.patch('/:id/stock', isManager, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  const products = JSON.parse(fs.readFileSync(productsDB));
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  products[productIndex].stock += parseInt(quantity);
  products[productIndex].updatedAt = new Date().toISOString();
  
  fs.writeFileSync(productsDB, JSON.stringify(products, null, 2));
  
  res.json(products[productIndex]);
});

module.exports = router;