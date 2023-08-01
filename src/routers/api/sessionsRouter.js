import { Router } from "express";
import {
  autenticacionPorGithub,
  autenticacionUserPass,
  antenticacionPorGithub_CB,
} from "../../middlewares/passport.js";
import {
  getCurrentSessionController,
  logoutSessionsController,
  postSessionsController,
} from "../../controllers/api/sessions.controller.js";
import { soloLogueadosApi } from "../../middlewares/soloLogueados.js";

export const sessionsRouter = Router();

// login local
sessionsRouter.post("/", autenticacionUserPass, postSessionsController); // POST http://localhost:8080/api/sessions

// login con github
sessionsRouter.get("/github", autenticacionPorGithub); // GET http://localhost:8080/api/sessions/github

sessionsRouter.get("/github/callback", antenticacionPorGithub_CB, (req, res, next) => {res.redirect("/");}); // ruta para e cllback del login Github

// logout
sessionsRouter.post("/logout", logoutSessionsController); //POST http://localhost:8080/api/sessions/logout

// datos de sesion, para testear!
sessionsRouter.get("/current", soloLogueadosApi, getCurrentSessionController); //GET http://localhost:8080/api/sessions/current
