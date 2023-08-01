import mongoose from 'mongoose'
import { CNX_STR } from "../src/config/database.config.js"



export const mochaHooks = {

  async beforeAll() {
    await mongoose.connect(CNX_STR)
    console.log("Conectado en BD para test")
    
  },

  async afterAll() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    console.log("BD test eliminada")
  }

}
