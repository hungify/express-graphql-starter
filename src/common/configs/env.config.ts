import z from 'zod';

const envVariables = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),

  SALT_OR_ROUND: z.string(),
  LOG_DIR: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_EXPIRE_IN: z.string(),
  REDIS_CONNECT_TIMEOUT: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

envVariables.parse(process.env);

export type EnvVariables = z.infer<typeof envVariables>;
