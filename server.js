const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));

// Após app.use(express.json());
app.use(require('./middlewares/errorHandler'));

// Modifique suas rotas para incluir validação:
const { loginValidator } = require('./validators/authValidators');
app.post('/api/auth/login', loginValidator, authController.login);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});