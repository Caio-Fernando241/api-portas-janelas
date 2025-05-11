const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersDB = path.join(__dirname, '../database/users.json');
const SECRET_KEY = 'loja_portas_janelas_secret';

// Cadastro de usuário
router.post('/register', (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  
  if (!['user', 'seller', 'manager'].includes(role)) {
    return res.status(400).json({ error: 'Tipo de usuário inválido' });
  }
  
  const users = JSON.parse(fs.readFileSync(usersDB));
  
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
  
  res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const users = JSON.parse(fs.readFileSync(usersDB));
  const user = users.find(u => u.email === email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '8h' }
  );
  
  res.json({ 
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

module.exports = router;