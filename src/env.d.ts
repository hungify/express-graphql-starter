/* eslint-disable @typescript-eslint/no-empty-interface */
import { EnvVariables } from './common/configs/env.config';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }
}
