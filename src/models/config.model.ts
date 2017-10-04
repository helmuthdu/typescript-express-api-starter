export interface DatabaseConfig {
    user: string;
    password: string;
    server: string;
    database: string;
    requestTimeout: number;
}

export interface Config {
    name: string;
    port: number;
    env: string;
    version?: string;
    db: DatabaseConfig;
}
