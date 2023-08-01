import { Ticket } from "../../dao/Models/Ticket.js";
import { ticketManager } from "../../dao/mongoodb/ticket.manager.js";
import { cartRpository } from "../../repositories/cart.repository.js";
import { cartService } from "../../services/carts.service.js";
import { ticketService } from "../../services/ticket.service.js";

export async function handlePost(req, res, next) {
  try {
    const result = await cartService.createCarts();
    res.send({ status: "succes", payload: result });
  } catch (error) {
    next(error);
  }
}

export async function handlePostAdd(req, res, next) {
  try {
    const result = await cartService.addProductCart(
      req.params.cid,
      req.params.pid,
      req.user.email      
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handlePostpurchase(req, res, next){
  try {    
     const result = await ticketService.purchase(req.params.cid)
     res.json(result);
  }catch (error) {
    next(error)
  }
}

export async function handleGet(req, res, next) {
  try {
    const result = await cartRpository.findByIdPopulate(req.params.cid, "products.product");
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteAll(req, res, next) {
  try {
    const result = await cartService.deleteAllProductCart(req.params.cid);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteOne(req, res, next) {
  try {
    const result = await cartService.deleteProductCart(
      req.params.cid,
      req.params.pid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateOne(req, res, next) {
  try {
    const result = await cartService.updateProductsCart(
      req.body,
      req.params.cid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function HandleUpdateQuantiy(req, res, next) {
  try {
    const result = await cartService.updateQuantiyProductsCart(
      req.params.pid,
      req.params.cid,
      req.body
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}
