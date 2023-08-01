import express, { Router } from "express";

import {
  handlePost,
  handleGet,
  handlePut,
  handleDelete,
} from "../../controllers/api/productsController.js";

import {
  productsAdddAction,
  productsDeletedAction,
} from "../../middlewares/permisoAcciones.js";

export const productsRouter = Router();

productsRouter.get("/:id?", handleGet);

productsRouter.post("/", productsAdddAction, handlePost);

productsRouter.put("/:id", productsDeletedAction, handlePut);

productsRouter.delete("/:id", productsDeletedAction, handleDelete);
