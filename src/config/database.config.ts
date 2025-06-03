import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME || 'root',
  password: process.env.TYPEORM_PASSWORD || 'root',
  database: process.env.TYPEORM_DATABASE || 'test',
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logger: process.env.TYPEORM_LOGGER || 'file',
  logging:
    process.env.TYPEORM_LOGGING === 'true'
      ? ['query', 'error', 'schema']
      : false,
  ssl: process.env.TYPEORM_SSL === 'true',
  schema: process.env.TYPEORM_SCHEMA,
  timezone: process.env.TYPEORM_TIMEZONE || 'Z',
}));
