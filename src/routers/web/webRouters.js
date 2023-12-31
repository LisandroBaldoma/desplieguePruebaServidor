import express, { Router } from "express";

import { cartDetailView, configView, homeView, loginView, productsView, profileView, registerView, updatePassword, userEditView } from "../../controllers/web/web.Controller.js";
import { soloLogueadosView } from "../../middlewares/soloLogueados.js";

export const webRouters = Router();

webRouters.get("/login", loginView)

webRouters.get("/register", registerView)

webRouters.get("/updatepasword", updatePassword)

webRouters.get("/", soloLogueadosView, homeView )

webRouters.get("/profile", soloLogueadosView, profileView)

webRouters.get("/products", soloLogueadosView, productsView)

webRouters.get("/carts/:cid", soloLogueadosView, cartDetailView)

webRouters.get("/configuracion", soloLogueadosView, configView )

// webRouters.get("/usersedit", soloLogueadosView, userEditView )