const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(`Erro de conexão com MongoDB: ${err}`);
});

db.once('open', () => {
  logger.info('Conectado ao MongoDB com sucesso!');
});

module.exports = mongoose;