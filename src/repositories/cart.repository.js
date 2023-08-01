import { cartDao } from "../dao/daos.factory.js";
import { GenericRepository } from "./GenericRepository.js";

export const cartRpository = new GenericRepository(cartDao);
