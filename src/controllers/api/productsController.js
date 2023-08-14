import { productsRepository } from "../../repositories/product.respository.js";
import { productService } from "../../services/products.service.js";

export async function handlePost(req, res, next) {
  try {
    const result = await productService.crearProduct(req.body, req.user.email);
    res.json({ status: "Producto Creado", payload: result });
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  req.logger.http("Handle_Get Prodcuts");
  try {
    if (req.params.id) {
      const result = await productsRepository.findById(req.params.id);
      res.status(200).json(result);
    } else {
      const result = await productsRepository.find(req.query);
      // console.log(req.query);
      res.status(200).json(result);
    }
  } catch (error) {
    req.logger.fatal("error en el handlefet de productos");
    next(error);
  }
}

export async function handlePut(req, res, next) {
  req.logger.http("Handle_Put Prodcuts");
  try {
    const productUpdate = await productsRepository.updateOne(
      req.params.id,
      req.body
    );
    res.json({ status: "Update", payload: productUpdate });
  } catch (error) {
    next(error);
  }
}

export async function handleDelete(req, res, next) {
  req.logger.http("Handle_Deleted Prodcuts");
  try {
    const product = await productService.deleteProduct(req.params.pid);
    res.status(200).json({ status: "deleted", payload: product });
  } catch (error) {
    next(error);
  }
}
