const jwt = require('jsonwebtoken');
const SECRET_KEY = 'loja_portas_janelas_secret';

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    req.user = decoded;
    next();
  });
}

function isManager(req, res, next) {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Acesso restrito a gerentes' });
  }
  next();
}

function isSeller(req, res, next) {
  if (req.user.role !== 'seller' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Acesso restrito a vendedores' });
  }
  next();
}

module.exports = { authenticate, isManager, isSeller };