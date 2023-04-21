import { existsSync, mkdirSync } from 'fs';
import type { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import envConfig from './env.config';
import type { GraphQLRequest } from '@apollo/server';
import type { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql';

// logs dir
const logDir: string = join(__dirname, envConfig.logDir);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

export const responseLogger = (request: GraphQLRequest<VariableValues>) => {
  const { query } = request;
  logger.info(query);
};

export const errorLogger = (error: GraphQLFormattedError) => {
  logger.error(error.message);
};
