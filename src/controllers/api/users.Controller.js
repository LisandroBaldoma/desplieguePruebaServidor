import { User } from "../../dao/Models/User.js";
import { ErrorDeAutenticacion } from "../../dao/Models/errors/ErrorDeAutenticacion.js";
import { productsRepository } from "../../repositories/product.respository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { usersService } from "../../services/users.service.js";

export async function handlePost(req, res, next) {
  try {
    const user = await usersService.registerUser(req.body);
    // funcion de passport para que el registro ya me deje logueado tambien!
    req.login(user, (error) => {
      if (error) {
        next(new ErrorDeAutenticacion());
      } else {
        res.status(201).json(req.user);
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const user = await userRepository.findByIdPopulate(req.params.id, "cart");
      res.status(200).json(user);
    } else {
      const users = await userRepository.find(req.query);
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
}

export async function handletgetCambiarRol(req, res, next) {
  try {
    const respuesta = await usersService.updateRol(req.params.uid);
    if (respuesta.hasOwnProperty("payload")) {
      req.user.rol = respuesta.payload;
      res.status(200).json(respuesta);
    } else {
      res.status(200).json(respuesta);
    }
  } catch (error) {
    next();
  }
}

export async function handletPostPasswordUpdate(req, res, next) {
  try {
    const respuesta = await usersService.updatePasswordUser(req.body);
    res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}

export async function handletEmailPassword(req, res, next) {
  try {
    const respuesta = await usersService.enviarEmailPasswordUpdate(req.body);
    res.status(200).json(respuesta);
  } catch (error) {}
}

export async function handlePostUploadDocuments(req, res, next) {
  try {
    const documents = await usersService.saveDocuments(
      req.files,
      req.params.uid
    );
    res.status(200).json(documents);
  } catch (error) {}
}

export async function handletDeleteUser(req, res, next) {
  try {
    const userDelete = await usersService.deleteUser(req.params.uid);
  } catch (error) {}
}
