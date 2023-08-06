import MongoStore from "connect-mongo";
import session from "express-session";
import { CNX_STR } from "../config/database.config.js";

export default session({
  store: MongoStore.create({ mongoUrl: CNX_STR }),
  saveUninitialized: false,
  resave: false,
  secret: "SESSION_SECRET",
});
