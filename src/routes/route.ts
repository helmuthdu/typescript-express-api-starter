/**
 * Constructor
 *
 * @class BaseRoute
 */
import { Router } from 'express';
import { ConnectionPool } from 'mssql';
import { config } from '../config';

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

  constructor () {
  }

  async connect (name: string): Promise<ConnectionPool> {
    if (!this.connection[name]) {
      this.connection[name] = new ConnectionPool(sqlConfig(name));
    }

    // not yet connected, start the connection.
    if (!this.connection[name].connected && !this.connection[name].connecting) {
      await this.connection[name].connect();
    }

    return this.connection[name];
  }

  async disconnect (name: string): Promise<boolean> {
    try {
      await this.connection[name].close();
      return true;

    } catch (e) {
      console.error('Error while disconnecting from database:', e);
      return false;
    }
  }
}
