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

  // jwt
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};

export default config;
