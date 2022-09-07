import { join } from 'path';
import { DataSource } from 'typeorm';
import { postgres } from '../configs/env.config';

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: postgres.host,
  port: postgres.port,
  username: postgres.username,
  password: postgres.password,
  database: postgres.database,
  entities: [join(__dirname, '../../**/typedefs/*.type.ts')],
  migrations: [join(__dirname, '../../**/*.migration.ts')],
  subscribers: [join(__dirname, '../../**/*.subscriber.ts')],
  logging: true,
  synchronize: true,
});

export const connectionToPostgres = () => {
  return postgresDataSource.initialize();
};
