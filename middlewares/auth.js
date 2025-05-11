const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acesso não autorizado' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_temporario');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
};