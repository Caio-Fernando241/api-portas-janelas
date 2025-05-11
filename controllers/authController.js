const { readData } = require('../utils/dataHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await readData('users');
      const user = users.find(u => u.email === email);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret_fallback',
        { expiresIn: '8h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erro no servidor' });
    }
  }
};