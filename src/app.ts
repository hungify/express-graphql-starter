import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { createServer } from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import refreshTokenRoute from './auth/routes/auth';
import type { BaseContext } from './common/interfaces/base.interface';
import type { Resolvers } from './common/interfaces/resolvers.interface';
import { errorMiddleware } from './common/middlewares';
import { errorLogger, logger, responseLogger } from './common/utils/logger';
import { nodeEnv } from './configs/env.config';
import { connectionToPostgres } from './databases';

const bootstrap = async (resolvers: Resolvers) => {
  await connectionToPostgres();

  const app = express();

  if (nodeEnv === 'production') {
    app.use(
      hpp(),
      helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
    );
  }
  app.use([
    compression(),
    express.json(),
    express.urlencoded({ extended: true }),
    cors({
      origin: ['https://studio.apollographql.com', 'http://localhost:4000'],
      credentials: true,
    }),
  ]);

  app.use(cookieParser());
  app.use('/refresh-token', refreshTokenRoute);

  app.use(errorMiddleware);

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers,
    }),
    plugins: [
      // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req, res }: BaseContext) => ({ req, res }),
    formatResponse: (response, request) => {
      responseLogger(request);
      return response;
    },
    formatError: (error) => {
      errorLogger(error);
      return error;
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['https://studio.apollographql.com', 'http://localhost:4000'],
      credentials: true,
    },
  });
  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void),
  );
  app.use(apolloServer.getMiddleware());
  app.use(errorMiddleware);

  logger.info(`=================================`);
  logger.info(`🚀 App listening on the port ${PORT}`);
  logger.info(`🎮 http://localhost:${PORT}/graphql`);
  logger.info(`=================================`);
};

export default bootstrap;
