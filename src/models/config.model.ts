export interface IDatabaseConfig {
  database: string;
  password: string;
  requestTimeout: number;
  server: string;
  user: string;
}

export interface IConfig {
  db: IDatabaseConfig;
  env: string;
  name: string;
  port: number;
  version?: string;
}
