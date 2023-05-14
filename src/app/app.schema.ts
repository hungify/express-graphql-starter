import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { print } from 'graphql';
import path from 'path';
import { envVariables } from '~/common/utils/env.util';

export const loadResolversWithSchema = () => {
  const typeDefModulesPath = path.join(__dirname, '../modules/**/*.graphql');
  const typeDefBasePath = path.join(__dirname, '../common/**/*.graphql');

  const loadedTypeDefFiles = loadSchemaSync([typeDefModulesPath, typeDefBasePath], {
    loaders: [new GraphQLFileLoader()],
  });
  const typeDefs = mergeTypeDefs(loadedTypeDefFiles);

  const resolverModulesPath = path.join(__dirname, '../modules/**/*.resolver.ts');
  const resolverAppPath = path.join(__dirname, '../app/*.resolver.*');
  const loadedResolverFiles = loadFilesSync([resolverModulesPath, resolverAppPath]);
  const resolvers = mergeResolvers(loadedResolverFiles);

  if (envVariables.nodeEnv === 'development') {
    console.log('🚀 :: file: schema.ts:27 :: typeDefs:', print(typeDefs));
    console.log('----------------------------------------');
    console.log('🚀 :: file: schema.ts:27 :: resolvers:', resolvers);
  }

  return makeExecutableSchema({ typeDefs, resolvers });
};
