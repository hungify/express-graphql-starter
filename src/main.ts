import 'reflect-metadata';
import { bootstrap } from './app';

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
