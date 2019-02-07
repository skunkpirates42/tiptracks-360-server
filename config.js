require ('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/tips-app',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};