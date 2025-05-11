const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acesso não autorizado' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  },
  
  isManager: (req, res, next) => {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Acesso restrito a gerentes' });
    }
    next();
  }
};