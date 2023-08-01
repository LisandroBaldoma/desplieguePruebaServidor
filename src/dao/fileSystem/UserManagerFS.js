import { User } from "./User.js";
import { encriptar, createSalt } from "../../utils/criptografia.js";
import fs from "fs/promises";

export class UserManagerFS {
  #users
  #ruta
  constructor(ruta) {
    this.#ruta = ruta;
    this.#users = [];
  }
  async #read() {
    const json = await fs.readFile(this.#ruta, "utf-8")
    this.#users = JSON.parse(json);
  }
  async #write(){
    const json = JSON.stringify(this.#users, null, 2)    
    await fs.writeFile(this.#ruta, json);
  }
  async createUser({ name, lastName, email, age, cart, password, rol}) {
    await this.#read()
    const salt = createSalt()    
    const user = new User({
      name,
      lastName,
      email,
      age,
      cart,
      password: encriptar(password, createSalt()),
      rol
      
    });
    this.#users.push(user);
    await this.#write()
    return user
  } 
  async loguear( { email, password } ) {
    //console.log(password)
    await this.#read()
    const user = this.#users.find((user) => user.email === email)
    
    if(user.password === encriptar(password, user.salt)){
      return user
    }else{
      throw new Error('credenciales Invalidas')
    }

  }
  getUserByID(id) {
    console.log("la funcion no esta disponible para trabaja en memoria")
  }
  getUserByEmail(email) {
    console.log("la funcion no esta disponible para trabaja en memoria")
  }
  getAllUsers() {
    console.log("la funcion no esta disponible para trabaja en memoria")
  }
}

export const userMangerFS = new UserManagerFS('./database/users.json')
 
