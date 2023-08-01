import { GenericRepository } from "./GenericRepository";
import { ticketDao } from '../dao/daos.factory.js'
 


export const ticketRepository = new GenericRepository(ticketDao)
