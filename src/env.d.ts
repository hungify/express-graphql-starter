export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;

      SALT_OR_ROUND: string;

      LOG_DIR: string;

      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      REDIS_EXPIRE_IN: string;
      REDIS_CONNECT_TIMEOUT: string;

      ACCESS_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN: string;

      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}
