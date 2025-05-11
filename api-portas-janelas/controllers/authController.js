const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersDB = path.join(__dirname, '../database/users.json');

const login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersDB));
  
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    'SEGREDO_PROVISORIO', // Substitua por process.env.JWT_SECRET depois
    { expiresIn: '8h' }
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};

module.exports = { login };