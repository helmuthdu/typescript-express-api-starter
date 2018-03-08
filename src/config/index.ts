import { IConfig } from '../models';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

export const config: IConfig = {
  db: {
    database: '<database_name>',
    password: isProd ? '<password>' : '<password>',
    requestTimeout: 60000,
    server: isProd ? '<host_name>' : '<host_name>',
    user: '<user_name>',
  },
  env: isProd ? 'prod' : 'dev',
  name: 'api',
  port: isProd ? 3001 : 5000,
};
