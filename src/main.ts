import 'reflect-metadata';
// organize-imports-disable-above
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import helmet from 'helmet';
import hpp from 'hpp';
import { createServer } from 'http';
import { AppContext } from '~/common/interfaces/base.interface';
import { envVariables, loadEnvVariables } from '~/common/utils/env.util';
import { authHelper } from '~/modules/auth/auth.helper';
import { permissions } from './app/app.permission';
import { loadResolversWithSchema } from './app/app.schema';
import { loadPrismaMiddlewares } from './common/middlewares';

const bootstrap = async () => {
  loadEnvVariables();
  loadPrismaMiddlewares();
  const app = express();
  const port = envVariables.port;
  const httpServer = createServer(app);
  const schema = loadResolversWithSchema();
  const isProduction = envVariables.nodeEnv === 'production';

  const apolloServer = new ApolloServer<AppContext>({
    schema: applyMiddleware(schema, permissions),
    introspection: !isProduction,
    plugins: [
      isProduction
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            includeCookies: true,
          }),
      {
        async requestDidStart() {
          return {
            async willSendResponse({ request }) {
              // responseLogger(request);
            },
          };
        },
      },
    ],
    csrfPrevention: true,
    cache: 'bounded',
    formatError: (error) => {
      // errorLogger(error);
      return error;
    },
  });

  if (isProduction) {
    app.use(
      hpp(),
      helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: true }),
    );
  }

  app.use([
    compression(),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
    cors({
      origin: envVariables.whitelistDomains,
      credentials: true,
    }),
  ]);

  await apolloServer.start();

  app.get('/', (_, res) => {
    return res.json({
      message: "Welcome to the GraphQL API, let's go to the playground",
      link: `http://localhost:${port}/graphql`,
      version: '0.0.1',
    });
  });

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const { authorization } = req.headers;
        const token = authorization?.split(' ')[1];
        const user = await authHelper.getUserFromToken(token);

        return { req, res, user };
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.info(`=================================`);
  console.info(`🚀 App listening on the port ${port}`);
  console.info(`🎮 http://localhost:${port}/graphql`);
  console.info(`=================================`);
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
