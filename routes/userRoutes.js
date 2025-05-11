const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersDB = path.join(__dirname, '../database/users.json');

// Perfil do usuário
router.get('/me', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersDB));
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Não retornar a senha
  const { password, ...userData } = user;
  res.json(userData);
});

// Atualizar perfil
router.patch('/me', (req, res) => {
  const { name } = req.body;
  
  const users = JSON.parse(fs.readFileSync(usersDB));
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  if (name) users[userIndex].name = name;
  users[userIndex].updatedAt = new Date().toISOString();
  
  fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
  
  const { password, ...userData } = users[userIndex];
  res.json(userData);
});

module.exports = router;