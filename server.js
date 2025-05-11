const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});