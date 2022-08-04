const mongoose = require('mongoose')
//const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.ky0aqm9.mongodb.net/ecommerce?retryWrites=true&w=majority'
const {MONGO_URI2} = require('../config/config')
//const prodModel = require('../models/productos')

const prod= require('../models/productos')
//const {} = require('../models/productos')
const cartModel = require('../models/cart')

class ContainerMongo {
  constructor(tipo) {
   const conn = mongoose.createConnection(MONGO_URI2, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))
  
    if (tipo ==='productos'){
      this.model=conn.model(prod.productosCollection,prod.productSchema);
    }else if (tipo==='carrito'){
      this.model=conn.model(cartModel.carritoCollection,cartModel.cartSchema);
    }
    //this.model=conn.model(collect,schema);
    
    //this.model2=conn.model('carrito',cartModel.cartSchema)  
    
  }

  async getAll(){
    return await this.model.find()
  }

  async getCarrito(){
    
    return await this.model.find()
  }

  async getCarritoNombre(name){
    return await this.model.find({name: name})
  }

  async getById(ids) {
    return await this.model.find({ id: ids })
  }

  async save(document) {

     let prod = this.model
     let saveProd = new prod(document)
    let save=saveProd.save()
    return save

  }

  async saveCarrito(document) {

    let cart = this.model
    let saveCart = new cart(document)
   let save=saveCart.save()
   return save

 }

  async update(content, ids){
    const filter = { id: ids };
    //const updates = content ;
    let doc = await this.model.findOneAndUpdate(filter, content, {
        new: true
      });
    return doc
  }

  async delete(ids){
    const filter = { id: ids };
    //const updates = content ;
    let doc = await this.model.deleteOne(filter);
  }

  async addProdToCart(content, ids){
    const filter = { id: ids };
    let doc = await this.model.findOneAndUpdate(filter, {$push: {products:content}});
    return doc
  }
}



module.exports = ContainerMongo;