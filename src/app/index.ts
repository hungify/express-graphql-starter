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
import helmet from 'helmet';
import hpp from 'hpp';
import { createServer } from 'http';
import { loadResolversWithSchema } from './schema';
import { AppContext } from '~/common/interfaces/base.interface';
import { envVariables, loadEnvVariables } from '~/common/utils/env.util';

export const bootstrap = async () => {
  loadEnvVariables();
  const app = express();
  const port = envVariables.port;
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer<AppContext>({
    schema: loadResolversWithSchema(),
    plugins: [
      envVariables.nodeEnv === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
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

  if (envVariables.nodeEnv === 'production') {
    app.use(
      hpp(),
      helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
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
    // errorMiddleware,
  ]);

  await apolloServer.start();

  app.use(
    '/',
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.info(`=================================`);
  console.info(`🚀 App listening on the port ${port}`);
  console.info(`🎮 http://localhost:${port}/graphql`);
  console.info(`=================================`);
};
