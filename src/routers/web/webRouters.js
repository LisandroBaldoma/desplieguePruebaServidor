import express, { Router } from "express";

import { cartDetailView, homeView, loginView, productsView, profileView, registerView, updatePassword } from "../../controllers/web/web.Controller.js";
import { soloLogueadosView } from "../../middlewares/soloLogueados.js";

export const webRouters = Router();

webRouters.get("/login", loginView)

webRouters.get("/register", registerView)

webRouters.get("/updatepasword", updatePassword)

webRouters.get("/", soloLogueadosView, homeView )

webRouters.get("/profile", soloLogueadosView, profileView)

webRouters.get("/products", soloLogueadosView, productsView)

webRouters.get("/carts/:cid", soloLogueadosView, cartDetailView)
