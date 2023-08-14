import { userRepository } from "../../repositories/user.repository.js";

export function getCurrentSessionController(req, res, next) {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error)
  }
  
}

export async function logoutSessionsController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout((err) => {
    res.sendStatus(200);
  });
}

export function postSessionsController(req, res, next) {
  
    res.status(201).json(req.user);
 
  //console.log("post session controller despues de buscar el usuario cuando puse login")
  //console.log(req.session)
  //console.log(req.user)
  
}
