require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  MONGO_URI2: process.env.MONGO_URI2 || '',
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 3000
}