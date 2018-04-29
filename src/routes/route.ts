import { logger } from '@/services';
import * as config from 'config';
import { Router } from 'express';

const dbConfig = (name: string): any => config.get(`db.${name}`);

export abstract class BaseRoute {
  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */

  protected router = Router();
  protected connection: any = {};

  public async connect (name: string): Promise<any> {
    return {};
  }

  public async disconnect (name: string): Promise<boolean> {
    try {
      return true;
    } catch (err) {
      logger.error('Error while disconnecting from database:', err);
      return false;
    }
  }
}
