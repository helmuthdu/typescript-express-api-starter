import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PingRoute extends BaseRoute {
  public static path = '/ping';
  private static instance: PingRoute;

  /**
   * @class PingRoute
   * @constructor
   */
  private constructor () {
    super();
    this.get = this.get.bind(this);
    this.init();
  }

  static get router () {
    if (!PingRoute.instance) {
      PingRoute.instance = new PingRoute();
    }
    return PingRoute.instance.router;
  }

  private init () {
    // log
    logger.info('[PingRoute] Creating ping route.');

    // add index page route
    this.router.get('/', this.get);
  }

  /**
   * @class PingRoute
   * @method get
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private async get (req: Request, res: Response, next: NextFunction) {
    res.json('pong');
    next();
  }
}
