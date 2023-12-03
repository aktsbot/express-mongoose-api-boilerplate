const makeCorsOrigins = () => {
  let origins = [];

  if (process.env.CORS_ORIGINS) {
    origins = process.env.CORS_ORIGINS.split(",");
  }

  return origins;
};

const config = {
  port: process.env.PORT || 3303,
  env: process.env.NODE_ENV || "development",
  mongodb_uri: process.env.MONGODB_URI,
  corsOrigins: makeCorsOrigins(),
};

export default config;
