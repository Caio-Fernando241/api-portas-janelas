const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/users', authMiddleware.authenticate, userRoutes);
app.use('/products', authMiddleware.authenticate, productRoutes);
app.use('/sales', authMiddleware.authenticate, salesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});