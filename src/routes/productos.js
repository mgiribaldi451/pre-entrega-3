const { ProductDaoMongo } = require('../daos/productsDaoMongo')
//const prod= require('../models/productos')


//let b =prod.productSchema
const prodDao = new ProductDaoMongo('productos')



async function getAllProds(req,res){

    let prod = await prodDao.getAll()
    res.json({prod})

}

async function getProdById(req,res){

    let prod = await prodDao.getById(req.params.id)
    res.json({prod})

}

function addProd(req,res){
    let product = req.body

    if(product && product.name && product.price && product.stock){
      product = prodDao.saveProd(product)
      res.json({result: 'product saved', product: product})
    } else {
      res.json({result: 'Prod cannot saved'})
    }
}



module.exports={getAllProds,addProd,getProdById}