import MongoStore from "connect-mongo";
import session from "express-session";
//import { MOONGODB_CONECTION_STRING } from "../config/database.config.js";
import dotenv from 'dotenv'

//dotenv.config();

export default session({
  store: MongoStore.create({mongoUrl: process.env.MOONGODB_CONECTION_STRING}),
  saveUninitialized: false,
  resave: false,
  secret: "SESSION_SECRET"
});
