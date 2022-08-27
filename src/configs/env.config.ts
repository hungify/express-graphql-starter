import dotenv from "dotenv";

dotenv.config();

export const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  expireIn: process.env.REDIS_EXPIRE_IN,
  connectTimeout: process.env.REDIS_CONNECT_TIMEOUT,
};

export const s3 = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION_NAME,
  bucket: process.env.S3_BUCKET_NAME,
};

export const jwt = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export const postgres = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const port = process.env.PORT || process.env.APP_PORT;

export const nodeEnv = process.env.NODE_ENV || "development";

export const logDir = process.env.LOG_DIR || "../logs";

export const saltOrRound = Number(process.env.SALT_OR_ROUND) || 10;

const envConfig = { redis, s3, jwt, postgres, port, nodeEnv, logDir, saltOrRound };

export default envConfig;
