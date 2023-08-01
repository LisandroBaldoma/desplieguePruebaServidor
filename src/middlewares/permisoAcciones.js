import { ErrorDeAutenticacion } from "../dao/Models/errors/ErrorDeAutenticacion.js";
import { ErrorDePermisos } from "../dao/Models/errors/ErrorDePermisos.js";
import { productsRepository } from "../repositories/product.respository.js";

export async function productsDeletedAction(req, res, next) {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    return next(new ErrorDeAutenticacion());
  } else if (req.user.rol === "premium") {
    console.log("ROL PREMIUM");
    try {
      let product = await productsRepository.findById(req.params.id);
      console.log(product);
      if (product.owner === req.user.email) {
        next();
      } else {
        return next(
          new ErrorDePermisos(
            `Solo el creador puede borrar este producto, el creador del producto, ${product.owen}`
          )
        );
      }
    } catch (error) {
      next(error);
    }

    // return next(new ErrorDePermisos('No tienes permisos de Admin'))
  } else if (req.user.rol === "user") {
    console.log("ROL USER");
    return next(
      new ErrorDePermisos(
        "Solo tienes permiso de Usuario, para eliminar productos debes tener permiso de Administrador"
      )
    );
  } else if (req.user.rol === "admin") {
    next();
  } else {
    return next(
      new ErrorDePermisos(
        "No tienes permisos de Admin, solo los Administradores pueden eliminar productos"
      )
    );
  }
}

export function addcartAction(req, res, next) {
  //console.log(req.params.cid)
  //console.log(req.user.cart)
  if (!req.isAuthenticated()) {
    return next(new ErrorDeAutenticacion());
  }
  if (req.params.cid != req.user.cart) {
    return next(
      new ErrorDePermisos(
        "Solo el Usuario puede agregar productos a este carrito"
      )
    );
  }
  next();
}

export async function productsAdddAction(req, res, next) {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    return next(new ErrorDeAutenticacion());
  }
  if (req.user.rol === "admin" || req.user.rol === "premium") {
    next();
  } else {
    return next(
      new ErrorDePermisos("Solo los Administradores pueden crear productos")
    );
  }
}
