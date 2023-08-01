import { productsDao } from "../dao/daos.factory.js";
import { GenericRepository } from "./GenericRepository.js";


export const productsRepository = new GenericRepository(productsDao);
