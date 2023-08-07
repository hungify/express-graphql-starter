import z from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  //  APP
  nodeEnv: z.literal('development').or(z.literal('production')),

  // CLIENT
  baseClientUrl: z.string().nonempty().url(),

  // HTTP
  port: z.string().nonempty(),
  timeout: z.string().nonempty(),

  // LOGGER
  loggerLevel: z.string().nonempty(),
  loggerEnabled: z.boolean(),
  loggerPath: z.string().nonempty(),

  // DATABASE
  databaseHost: z.string().nonempty(),
  databasePort: z.string().nonempty(),
  databaseUser: z.string().nonempty(),
  databasePassword: z.string().nonempty(),
  databaseDb: z.string().nonempty(),
  databaseUrl: z.string().nonempty(),

  // AUTH
  saltRounds: z.number(),
  apiKey: z.string().nonempty(),
  accessTokenSecret: z.string().nonempty(),
  accessTokenExpiresIn: z.string().nonempty(),
  refreshTokenSecret: z.string().nonempty(),
  refreshTokenExpiresIn: z.string().nonempty(),

  verifyEmailTokenSecret: z.string().nonempty(),
  verifyEmailTokenExpiresIn: z.string().nonempty(),

  changeEmailTokenSecret: z.string().nonempty(),
  changeEmailTokenExpiresIn: z.string().nonempty(),

  changePasswordTokenSecret: z.string().nonempty(),
  changePasswordTokenExpiresIn: z.string().nonempty(),

  // REDIS
  redisHost: z.string().nonempty(),
  redisPort: z.string().nonempty(),
  redisPassword: z.string().nonempty(),
  redisExpireIn: z.string().nonempty(),
  redisConnectTimeout: z.string().nonempty(),

  // CORS
  whitelistDomains: z.array(z.string().nonempty()),
  corsEnabled: z.boolean(),

  // MAILER
  // mailerHost: z.string().nonempty(),
  // mailerPort: z.string().nonempty(),
  mailerUser: z.string().nonempty(),
  mailerPassword: z.string().nonempty(),
});

export type EnvVariables = z.infer<typeof envSchema>;

export const envVariables = {
  //  APP
  nodeEnv: process.env.NODE_ENV as 'development' | 'production',

  // CLIENT
  baseClientUrl: process.env.BASE_CLIENT_URL,

  // HTTP
  port: process.env.PORT,
  timeout: process.env.TIMEOUT,

  // LOGGER
  loggerLevel: process.env.LOGGER_LEVEL,
  loggerEnabled: Boolean(process.env.LOGGER_ENABLED),
  loggerPath: process.env.LOGGER_PATH,

  // DATABASE
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseDb: process.env.DATABASE_DB,
  databaseUrl: process.env.DATABASE_URL,

  // AUTH
  saltRounds: Number(process.env.SALT_ROUNDS),
  apiKey: process.env.API_KEY,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,

  verifyEmailTokenSecret: process.env.VERIFY_EMAIL_TOKEN_SECRET,
  verifyEmailTokenExpiresIn: process.env.VERIFY_EMAIL_TOKEN_EXPIRES_IN,

  changeEmailTokenSecret: process.env.CHANGE_EMAIL_TOKEN_SECRET,
  changeEmailTokenExpiresIn: process.env.CHANGE_EMAIL_TOKEN_EXPIRES_IN,

  changePasswordTokenSecret: process.env.CHANGE_PASSWORD_TOKEN_SECRET,
  changePasswordTokenExpiresIn: process.env.CHANGE_PASSWORD_TOKEN_EXPIRES_IN,

  // REDIS
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  redisExpireIn: process.env.REDIS_EXPIRE_IN,
  redisConnectTimeout: process.env.REDIS_CONNECT_TIMEOUT,

  // CORS
  whitelistDomains: process.env.WHITELIST_DOMAINS.split(', '),
  corsEnabled: Boolean(process.env.CORS_ENABLED),

  // MAILER
  // mailerHost: process.env.MAILER_HOST,
  // mailerPort: process.env.MAILER_PORT,
  mailerUser: process.env.MAILER_USER,
  mailerPassword: process.env.MAILER_PASSWORD,
} satisfies EnvVariables;

export const loadEnvVariables = () => {
  envSchema.parse(envVariables);
};
