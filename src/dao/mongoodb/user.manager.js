import mongoose, { Schema } from "mongoose";
import { GenericDao } from "./GenericDao.js";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schemaUser = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    cart: { type: Schema.Types.ObjectId, ref: "carts", required: false },
    lastName: { type: String, required: true },
    rol: { type: String, enum: ["user", "admin", "premium"], default: "user" },
    documents: { type: Array },
    last_connection: {type: String},
  },
  { versionKey: false }
);
schemaUser.plugin(mongoosePaginate);

const userModel = mongoose.model(collection, schemaUser);

export const userManager = new GenericDao(userModel);


