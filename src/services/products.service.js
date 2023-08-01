import { Product } from "../dao/Models/Product.js";
import { productsRepository } from "../repositories/product.respository.js";
import { userRepository } from "../repositories/user.repository.js";
import { winstonLogger } from "../utils/logger.js";

class ProductsService {
  async crearProduct(product, email) {
    console.log(email);
    let productNew;
    if (product.hasOwnProperty("owner")) {
      productNew = new Product(product);
    } else {
      let usuario = await userRepository.find(email);
      //console.log(usuario.payload[0].rol)
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
}

export const productService = new ProductsService();
