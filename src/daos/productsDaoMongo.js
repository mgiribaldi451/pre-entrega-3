const ContainerMongo = require('../container/ContainerMongo')
const productModel = require('../models/productos')

class ProductDaoMongo extends ContainerMongo{
  constructor(a) {
    super(a);
    this.id = 0
    this.checkId()
  }
 // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
 async checkId(){
    let productos = await this.getAll()
    // console.log('check id');
    // console.log(productos);
    if(productos.length > 0) {

      this.id = parseInt(productos[productos.length - 1].id) + 1
    }
  }


  saveProd(productos){
    if(productos){
      console.log(productos)
    
        //const saveProduct = req.body;
        //console.log(saveProduct);
        const data = this.save(productos);
        this.id++
        //res.status(200).send(data);
        return productos
      }else{
        return 'Not save'
      }
    }

  

  updateProd(productos, id){
    if(productos) {
      console.log(productos)
      this.update(productos, id)
      return productos
    } else {
      return 'Not updated'
    }
  }

} 

module.exports = { ProductDaoMongo }