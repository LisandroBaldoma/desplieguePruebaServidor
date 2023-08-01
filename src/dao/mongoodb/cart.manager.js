// import cartModel from "../Models/cart.Mongoose.js";
import { Schema, model } from "mongoose";
import { productsManager } from "./product.manager.js";
import { GenericDao } from "./GenericDao.js";

const collection = "carts";

export const schemaProduct = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { versionKey: false }
);

const cartModel = model(collection, schemaProduct);

export const cartManager = new GenericDao(cartModel);
