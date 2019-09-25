import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PingRoute {
  public static path = '/ping';
  private static instance: PingRoute;
  private router = Router();

  /**
   * @class PingRoute
   * @constructor
   */
  private constructor() {
    // log
    logger.info('[PingRoute] Creating ping route.');

    // add index page route
    this.router.get('/', this.get);
  }

  static get router() {
    if (!PingRoute.instance) {
      PingRoute.instance = new PingRoute();
    }
    return PingRoute.instance.router;
  }

  /**
   * @class PingRoute
   * @method get
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    res.json('pong');
    next();
  };
}
