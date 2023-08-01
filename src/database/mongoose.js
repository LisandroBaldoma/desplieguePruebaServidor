import mongoose from "mongoose";
//import { MOONGODB_CONECTION_STRING } from "../config/database.config.js";
import dotenv from 'dotenv'

dotenv.config()
export async function conectarMongooseDb() {
  await mongoose.connect(process.env.MOONGODB_CONECTION_STRING);
  console.log(`Base de Datos conectada a ${process.env.MOONGODB_CONECTION_STRING}`);
  
}

export async function desconectarMongoseDB() {
  await mongoose.connection.close();
  console.log("Base de Datos desconectada, el proceso se reaizo con exito");
}
