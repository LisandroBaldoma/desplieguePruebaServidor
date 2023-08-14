import { Cart } from "../dao/Models/Cart.js";
import { cartRpository } from "../repositories/cart.repository.js";
import { productsRepository } from "../repositories/product.respository.js";

class CartsService {
  async createCarts() {
    const newCart = new Cart();
    const result = await cartRpository.create(newCart.datosCarts());
    return result;
  }

  async addProductCart(cid, pid, userMail) { 
    console.log('agregar product al carrito')
    console.log(cid) 
    console.log(pid)    
    const cart = await cartRpository.findById(cid);
    const prod = await productsRepository.findById(pid);    
    const index = cart.products.findIndex((product) => product.product == pid);
    if(userMail === prod.owner){
      throw new Error("No puede agregar un producto que fue creado por usted mismo"); 
    }
    if (index !== -1) {
      cart.products[index].quantity = cart.products[index].quantity + 1;
      cart.save();
      return cart.products[index];
    } else {
      cart.products.push({ product: pid, quantity: 1 });
      cart.save();
      return cart.products;
    }
  }
  async deleteAllProductCart(cid) {
    const cart = await cartRpository.findById(cid);

    cart.products = [];
    cart.save();
    return cart;
  }
  async deleteProductCart(cid, pid) {
    //console.log(pid);

    const cart = await cartRpository.findById(cid);
    //const prod = await productsManager.findById(pid);
    //console.log(cart)

    const index = cart.products.findIndex((product) => product.product == pid);
    if (index !== -1) {
      cart.products.splice(index, 1);
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }
  async updateProductsCart(body, cid) {
    const cart = await cartRpository.findById(cid);

    cart.products = [];
    body.forEach((element) => {
      cart.products.push(element);
    });
    cart.save();
  }
  async updateQuantiyProductsCart(pid, cid, body) {
    const cart = await cartRpository.findById(cid);
    const prod = await productsRepository.findById(pid);

    const index = cart.products.findIndex((product) => product.product == pid);
    if (index !== -1) {
      cart.products[index].quantity = body.quantity;
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }
}

export const cartService = new CartsService();
