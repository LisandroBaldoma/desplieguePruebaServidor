export class User {
    constructor({ name, lastName, email, age, cart, password, rol }){
        this.name = name,
        this.lastName = lastName,
        this.email = email,
        this.age = age,
        this.cart = cart
        this.password = password,
        this.rol = rol
    }
}

// salt codigo que uso paara encriptar y desencriptar contraseñas.