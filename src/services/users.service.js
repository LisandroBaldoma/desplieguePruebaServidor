import { Cart } from "../dao/Models/Cart.js";
import { User } from "../dao/Models/User.js";
import { cartRpository } from "../repositories/cart.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import {
  ValidarPassword,
  generarToken,
  hashearPassword,
  decodificarToken,
} from "../utils/criptografia.js";
import { cartService } from "./carts.service.js";
import { emailService } from "./email.service.js";

class UsersService {
  async registerUser(user) {
    const datosNewUser = user;
    datosNewUser.password = hashearPassword(datosNewUser.password);

    const newCart = new Cart();
    const cartUser = await cartService.createCarts(newCart.datosCarts());

    datosNewUser.cart = cartUser._id;

    const newUser = new User(datosNewUser);
    const userRegister = await userRepository.create(newUser.datosUser());
    return userRegister;
  }
  async updateRol(uid) {
    let respuesta;
    console.log("CAMBIAR ROL DE USUARIO");
    const user = await userRepository.findById(uid);
    console.log(user);
    if (user.rol === "premium") {
      user.rol = "user";
      user.save();
      respuesta = { status: "Su rol fue actualizado", payload: user.rol };
    } else if (user.rol === "user") {
      user.rol = "premium";
      user.save();
      respuesta = { status: "Su rol fue actualizado", payload: user.rol };
    } else {
      respuesta = {
        status: "Para cambiar de rol debe ser User o Premium",
        payload: user.rol,
      };
      return res.json({
        status: "Para cambiar de rol debe ser User o Premium",
      });
    }
    return respuesta;
  }
  async updatePasswordUser(user) {
    const userUpdate = await userRepository.findOne({ email: user.email });

    if (ValidarPassword(user.newPassword, userUpdate.password)) {
      throw new Error(
        "La contraseña ingresada no puede ser igual que la anteror"
      );
    } else {
      if (user.newPassword != user.confirmPassword) {
        throw new Error(
          "Su nueva password y la confirmacion de la misma no coinciden"
        );
      } else {
        let datosToken = decodificarToken(user.token);

        if (
          datosToken.email != userUpdate.email ||
          datosToken.iat === datosToken.exp
        ) {
          throw new Error("Token vencido o incorecto");
        } else {
          userUpdate.password = hashearPassword(user.newPassword);

          userUpdate.save();
        }

        let respuesta = {
          mensaje: "La contraseña fue ser actualizada con exito",
        };

        return respuesta;
      }
    }
    // TODO UPDATE CONTRASEÑA
  }
  async enviarEmailPasswordUpdate(datos) {
    console.log(datos.email);

    const token = generarToken(datos);

    console.log(token);
    let option = {
      from: "lrsolucionesintegrales@gmail.com",
      to: datos.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Este mail es para recuperar la contraseña", // plain text body
      html: `<div> <h3>Recuperar Contraseña</h3> <br> <p>Token: <br> ${token}</p> <br> <p>Link:</p><a>http://localhost:8080/api/user/passwordupdate</a></div>`,
    };

    // await emailService.send(
    //   "baldomalisandro@hotmail.com",
    //   `te damos la bienvenida, ${token}!`
    // );
    respuesta = await emailService.send(option);

    return respuesta;
  }
  async saveDocuments(document, uid){
    const user = await userRepository.findById(uid)
    console.log(user)
    console.log(document)

    const documents = {
      name: document[0].documents.fieldname,
      reference: document.documents.path
    }
    const profiles = {
      name: document[1].profiles.fieldname,
      reference: document.profiles.path
    } 
    const products = {
      name: document[2].products.fieldname,
      reference: document.products.path
    }   

    user.documents.push(documents,profiles,products)
    user.save()
  }
}

export const usersService = new UsersService();
