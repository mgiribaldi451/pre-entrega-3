const mongoose = require("mongoose");

const productosCollection = 'productos';

const productSchema = new mongoose.Schema({
    id: {type:Number,required:true,max:100},
    name: {type:String,required:true,max:100},
    price: {type:Number,required:true,max:10000000},
    stock: {type:Number,required:true,max:100}

})


// const products = mongoose.model(productosCollection,productSchema)

module.exports = {productSchema,productosCollection}