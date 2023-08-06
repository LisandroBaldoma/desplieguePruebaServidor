import mongoose from "mongoose";
import { CNX_STR } from "../config/database.config.js";

export async function conectarMongooseDb() {
  await mongoose.connect(CNX_STR);
  console.log(`Base de Datos conectada a ${CNX_STR}`);
  
}

export async function desconectarMongoseDB() {
  await mongoose.connection.close();
  console.log("Base de Datos desconectada, el proceso se reaizo con exito");
}
