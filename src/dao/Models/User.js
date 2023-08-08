import { newId } from "../../utils/criptografia.js";

export class User {
  #user_id;
  #name;
  #lastName;
  #email;
  #age;
  #cart;
  #password;
  #rol;
  #documents;
  #last_connection;

  constructor({
    user_id = newId(),
    name,
    lastName,
    email,
    age,
    cart,
    password,
    rol,
    documents,
    last_connection = new Date(),
  }) {
    this.#user_id = user_id;
    this.#name = name;
    this.#lastName = lastName;
    this.#email = email;
    this.#age = age;
    this.#cart = cart;
    this.#password = password;
    this.#rol = rol;
    this.#documents = documents;
    this.#last_connection = last_connection;
  }

  set rol(value) {
    if (value === "user" && value !== "premium")
      throw new Error("Solo puede cambiar el rol si es user o premium");
    this.#rol = value;
    if (value === "user") {
      this.#rol = "premium";
    }
    if (value === "premium") {
      this.#rol = "user";
    }
  }

  get user_id() {
    return this.#user_id;
  }
  get name() {
    return this.#name;
  }
  get lastName() {
    return this.#lastName;
  }
  get email() {
    return this.#email;
  }
  get age() {
    return this.#age;
  }
  get cart() {
    return this.#cart;
  }
  get password() {
    return this.#password;
  }
  get rol() {
    return this.#rol;
  }
  get documents() {
    return this.#documents;
  }
  get last_connection() {
    return this.#last_connection;
  }

  // TODO CREAR FUNCION SET ROL

  datosUser() {
    return {
      user_id: this.#user_id,
      name: this.#name,
      lastName: this.#lastName,
      email: this.#email,
      age: this.#age,
      cart: this.#cart,
      password: this.#password,
      rol: this.#rol,
      documents: this.#documents,
      last_connection: this.#last_connection,
    };
  }
  datosUserWeb() {
    return {      
      name: this.#name,
      lastName: this.#lastName,
      email: this.#email,
      age: this.#age,     
      rol: this.#rol,      
    };
  }
}
