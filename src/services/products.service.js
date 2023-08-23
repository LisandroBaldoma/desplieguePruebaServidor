import { Product } from "../dao/Models/Product.js";
import { productsRepository } from "../repositories/product.respository.js";
import { userRepository } from "../repositories/user.repository.js";
import { winstonLogger } from "../utils/logger.js";
import { emailService } from "./email.service.js";

class ProductsService {
  async crearProduct(product, email) {    
    let productNew;
    if (product.hasOwnProperty("owner")) {
      productNew = new Product(product);
    } else {
      let usuario = await userRepository.find(email);      
      if (usuario.payload[0].rol === "premium") {
        product.owner = usuario.payload[0].email;
        productNew = new Product(product);
      } else {
        product.owner = "admin";
        productNew = new Product(product);
      }
    }
    const result = await productsRepository.create(productNew.datosProduct());
    winstonLogger.http("Producto Creado", result);
    return result;
  }
  async deleteProduct(pid){  
    console.log(pid)  
    const deleteProduct = await productsRepository.deleteOne(pid);
    
    console.log(deleteProduct)
    
    if(!deleteProduct) throw new Error('NOT FOUND')
    
    // let option = {
    //   from: "lrsolucionesintegrales@gmail.com",
    //   to: deleteProduct.owner, // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Producto Eliminado", // plain text body
    //   html: `<div> <h3>Se ha eliminado el productos ${deleteProduct.title}</h3> </div>`,
    // };
    // let respuesta = await emailService.send(option);
    return deleteProduct
    
  }
}

export const productService = new ProductsService();
