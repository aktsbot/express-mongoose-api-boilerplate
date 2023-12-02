import "dotenv/config";
import express from "express";

import { connectDB, closeDB } from "./db.js";
import config from "./config.js";
import logger from "./logger.js";
import httpLogger from "./middlewares/http-logger.middleware.js";

const app = express();

app.use(httpLogger());

app.get("/", (req, res) => {
  return res.json({
    message: "Aha!",
  });
});

const server = app.listen(config.port, (err) => {
  if (err) {
    logger.fatal("app failed to start");
    logger.error(err);
    process.exit(1);
  }

  logger.info(`app started on port ${config.port}`);
  connectDB();
});

// clean up - when server dies, make sure db connection
// also dies
function cleanup() {
  server.close(() => {
    logger.warn("closed out app server");
    closeDB();
    // Note: the close event does actually happen, the docker logs
    // in mongo container does indicate that. The timeout is for us
    // to visually see the confirmation that the node process has
    // withdrawn connection - you can skip the timeout and call
    // process.exit straight away!

    // process.exit(0);
    setTimeout(() => {
      process.exit(0);
    }, 300);
  });
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", cleanup);
