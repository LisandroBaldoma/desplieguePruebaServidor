import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { GenericDao } from "./GenericDao.js";

const collection = "products";

const schemaProduct = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    thumbnails: { type: Array, required: true },
    status: { type: Boolean, required: true },
    owner:{ type: String, required: true },
  },
  { versionKey: false }
);

schemaProduct.plugin(mongoosePaginate);

const productModel = model(collection, schemaProduct);

export const productsManager = new GenericDao(productModel);


