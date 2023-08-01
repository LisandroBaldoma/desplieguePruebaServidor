import { Ticket } from "../dao/Models/Ticket.js";
import { ticketManager } from "../dao/mongoodb/ticket.manager.js";

import { cartRpository } from "../repositories/cart.repository.js";
import { productsRepository } from "../repositories/product.respository.js";

import { userRepository } from "../repositories/user.repository.js";
import { cartService } from "./carts.service.js";

class TicketService {
  async purchase(cid) {
    let cart = await cartRpository.findByIdPopulate(cid, "products.product");
    if (cart.products.length === 0) {
      throw new Error(
        "Para realizar una compra el carrito debe contenner al menos 1 producto"
      );
    }
    const user = await userRepository.findOne({ cart: cid });
    let ticket;
    let response;

    const productSinStock = [];
    const productConStock = [];
    let amount = 0;
    cart.products.forEach(async (element, key) => {
      if (element.product.stock >= element.quantity) {
        let subamount = element.product.price * element.quantity;
        amount = amount + subamount;
        let updateStock = element.product.stock - element.quantity;
        productConStock.push(element);
        await productsRepository.updateOne(element.product._id, {
          stock: updateStock,
        });
      } else {
        productSinStock.push(element);
      }
    });

    if (productConStock.length > 0) {
      let datosTicket = { amount: amount, purchaser: user.email };
      const newTicket = new Ticket(datosTicket);
      ticket = await ticketManager.create(newTicket.dtoTicket());
    }

    await cartService.updateProductsCart(productSinStock, cid);
    cart = await cartRpository.findByIdPopulate(cid, "products.product");
    // response propiedad tipo es para identificar en el front que carts mostrar 0-Comprar exitosa de todos los prodcutos 1-Compra exitosa de los productos con stock 2- No se pudo realizar la compra
    if (ticket != undefined) {
      if (productSinStock.length === 0) {
        response = {
          response: "Compra realizada con exito",
          ticket: ticket,
          cart: cart.products,
          tipo: 0,
        };
      } else {
        response = {
          response:
            "Compra realizada parcialmente, algunos productos no pudieron procesarce por falta de Stock",
          ticket: ticket,
          cart: cart.products,
          tipo: 1,
        };
      }
    } else {
      response = {
        response:
          "La compra no se pudo realizar, los productos seleccionados no cuentan con stock",
        cart: cart.products,
        tipo: 2,
      };
    }
    return response;
  }
}

export const ticketService = new TicketService();
