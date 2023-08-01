import express, { Router } from "express";

import {
  handlePostAdd,
  handlePost,
  handleDeleteAll,
  handleDeleteOne,
  handleGet,
  handleUpdateOne,
  HandleUpdateQuantiy,
  handlePostpurchase,
} from "../../controllers/api/cartsController.js";
import { addcartAction } from "../../middlewares/permisoAcciones.js";

export const cartRouter = Router();

cartRouter.post("/", handlePost);

cartRouter.post("/:cid/product/:pid", addcartAction, handlePostAdd);

cartRouter.get("/:cid", handleGet);

cartRouter.delete("/:cid", handleDeleteAll);

cartRouter.delete("/:cid/product/:pid", handleDeleteOne);

cartRouter.put("/:cid", handleUpdateOne);

cartRouter.put("/:cid/product/:pid", HandleUpdateQuantiy);

cartRouter.post('/:cid/purchase', handlePostpurchase)

