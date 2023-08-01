import { ErrorDePermisos } from "../dao/Models/errors/ErrorDePermisos.js";

export function soloLogueadosApi(req, res, next) {
  // acá uso el atajo que me provee passport para ver
  // si hay una sesion inicializada por un usuario
  if (!req.isAuthenticated()) {
    //     console.log('peticion de un usuario sin autenticarse, se lanza error')
    return next(new ErrorDePermisos());
  }
  // console.log('peticion de un usuario autenticado! continua el flujo normal del caso de uso')
  next();
}

export function soloLogueadosView(req, res, next) {
  // acá uso el atajo que me provee passport para ver
  // si hay una sesion inicializada por un usuario
  if (!req.isAuthenticated()) {
    // console.log('peticion de un usuario sin autenticarse, se redirige a la pagina de login')
    return res.redirect("/login");
  }
  // console.log('peticion de un usuario autenticado! se redirige a la pagina de inicio')
  next();
}
