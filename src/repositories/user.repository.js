import { usersDao } from "../dao/daos.factory.js";
import { GenericRepository } from "./GenericRepository.js";

export const userRepository = new GenericRepository(usersDao);
