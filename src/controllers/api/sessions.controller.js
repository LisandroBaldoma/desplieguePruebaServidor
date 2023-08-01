export function getCurrentSessionController(req, res, next) {
  res.json(req.user);
}

export async function logoutSessionsController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout((err) => {
    res.sendStatus(200);
  });
}

export function postSessionsController(req, res, next) {
  //console.log("post session controller despues de buscar el usuario cuando puse login")
  //console.log(req.session)
  //console.log(req.user)
  res.status(201).json(req.user);
}
