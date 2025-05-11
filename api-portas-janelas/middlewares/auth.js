const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ error: 'Acesso não autorizado' });

  try {
    const decoded = jwt.verify(token, 'SEGREDO_PROVISORIO');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Acesso restrito a gerentes' });
  }
  next();
};

module.exports = { authenticate, isManager };