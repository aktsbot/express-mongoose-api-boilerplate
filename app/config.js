const config = {
  port: process.env.PORT || 3303,
  env: process.env.NODE_ENV || "development",
  mongodb_uri: process.env.MONGODB_URI,
};

export default config;
