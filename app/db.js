import mongoose from "mongoose";
import config from "./config.js";

import logger from "./logger.js";

export const connectDB = () => {
  // connecting to database
  mongoose.connect(config.mongodb_uri);
  mongoose.connection.on("error", () => {
    logger.info("mongodb connection error");
  });
  mongoose.connection.once("open", () => {
    logger.info("mongodb connection success");
  });
};

export const closeDB = () => {
  mongoose.connection.close();
  mongoose.connection.on("close", () => {
    logger.info("mongodb connection closed");
  });
};

export default mongoose;
