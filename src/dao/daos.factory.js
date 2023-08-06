import { PERSISTENCIA } from '../config/database.config.js';
import { conectarMongooseDb } from '../database/mongoose.js';

let cartDao
let productsDao
let usersDao
let ticketDao
      
await conectarMongooseDb();

const { cartManager } = await import('./mongoodb/cart.manager.js')
const { productsManager } = await import('./mongoodb/product.manager.js')
const { userManager } = await import('./mongoodb/user.manager.js')
const { ticketManager } = await import('./mongoodb/ticket.manager.js')

cartDao = cartManager
productsDao = productsManager
usersDao = userManager
ticketDao = ticketManager

console.log(`Persistencia de datos en: ${PERSISTENCIA} `) 
 

export { cartDao, productsDao, usersDao, ticketDao }