import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { GenericDao } from "./GenericDao.js";

const collection = "ticket";

const schemaTicket = new Schema(
    {
       id:{type: String, required: true },
       code:{type: String, required: true},
       purchase_dateTime:{type: Date, required: true},
       amount:{type: Number, required: true, min: [0, 'debe ser mayor 0, got {VALUE}']},
       purchaser:{type: String, required: true},

    },
    {versionKey: false}
);

schemaTicket.plugin(mongoosePaginate);

const ticketModel = model(collection, schemaTicket);

export const ticketManager = new GenericDao(ticketModel);


