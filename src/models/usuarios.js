const mongoose = require('mongoose');
const logger = require('../utils/logger.js')
//const {MONGO_URI} = require('../config/config')

//  mongoose.createConnection(MONGO_URI, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
//   }, () => logger.info('DB users conectada'))

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    //email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 100},
    phone: {type: String, required: true, max: 100}
})

// module.exports = mongoose.model(usuariosCollection, UsuarioSchema)
module.exports = {UsuarioSchema,usuariosCollection}