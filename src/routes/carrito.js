const { CartDaoMongo } = require('../daos/cartDaoMongo')
//const cartModel = require('../models/cart')

//let a = cartModel.cartSchema

const cartDao = new CartDaoMongo('carrito')


async function getCart(req,res){

    //let prod = await cartDao.getCarritoNombre(req.params.name)
    //
    let prod = await cartDao.getCarrito()
    //res.render('carrito' , {prod})
    res.json({prod})
}


module.exports={getCart}