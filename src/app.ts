import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { resolvers } from '@generated/type-graphql';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { createServer } from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { errorLogger, logger, responseLogger } from '~/common/utils/logger';
import { errorMiddleware } from './common/middlewares';
import { appEnv } from './common/configs/env.config';

console.log(process.env);

const bootstrap = async () => {
  const app = express();

  app.use([
    compression(),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
    errorMiddleware,
  ]);

  if (appEnv('NODE_ENV') === 'production') {
    app.use(
      hpp(),
      helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
    );
  }

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    plugins: [
      appEnv('NODE_ENV') === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
      {
        async requestDidStart() {
          return {
            async willSendResponse({ request }) {
              responseLogger(request);
            },
          };
        },
      },
    ],
    csrfPrevention: true,
    cache: 'bounded',
    formatError: (error) => {
      errorLogger(error);
      return error;
    },
  });

  await apolloServer.start();

  app.use(
    '/',
    cors({
      origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
      credentials: true,
    }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

  logger.info(`=================================`);
  logger.info(`🚀 App listening on the port ${PORT}`);
  logger.info(`🎮 http://localhost:${PORT}/graphql`);
  logger.info(`=================================`);
};

bootstrap();
