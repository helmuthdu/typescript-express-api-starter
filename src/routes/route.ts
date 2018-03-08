import { Router } from 'express';
import { ConnectionPool } from 'mssql';
import { config } from '../config';
import { logger } from '../services';

const sqlConfig = (name: string): any => config.db[name];

export abstract class BaseRoute {
  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */

  protected router = Router();
  protected connection: any = {};

  public async connect (name: string): Promise<ConnectionPool> {
    if (!this.connection[name]) {
      this.connection[name] = new ConnectionPool(sqlConfig(name));
    }

    // not yet connected, start the connection.
    if (!this.connection[name].connected && !this.connection[name].connecting) {
      await this.connection[name].connect();
    }

    return this.connection[name];
  }

  public async disconnect (name: string): Promise<boolean> {
    try {
      await this.connection[name].close();
      return true;

    } catch (err) {
      logger.error('Error while disconnecting from database:', err);
      return false;
    }
  }
}
