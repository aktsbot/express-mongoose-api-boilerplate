import "dotenv/config";
import express from "express";

import { connectDB, closeDB } from "./db.js";

import logger from "./logger.js";

connectDB();

logger.info("Info works");
logger.debug("Debug works");
logger.trace("Trace works");
logger.warn("Warn works");
logger.error("Error works");

setTimeout(() => {
  closeDB();
}, 2000);
