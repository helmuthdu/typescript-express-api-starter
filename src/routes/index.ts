import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { PingRoute } from './ping';
import { BaseRoute } from './route';
import { UploadRoute } from './upload';

/**
 * / route
 *
 * @class User
 */
export class ApiRoutes extends BaseRoute {
  public static path = '/api';
  private static instance: ApiRoutes;

  /**
   * @class ApiRoutes
   * @constructor
   */
  private constructor () {
    super();
    this.get = this.get.bind(this);
    this.init();
  }

  /**
   * @class ApiRoute
   * @method getRouter
   * @returns {Router}
   */
  static get router () {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  /**
   * @class ApiRoute
   * @method init
   */
  private init () {
    // log
    logger.info('[ApiRoute] Creating api routes.');

    // add index page route
    this.router.get('/', this.get);
    this.router.use(PingRoute.path, PingRoute.router);
    this.router.use(UploadRoute.path, UploadRoute.router);
  }

  /**
   * @class ApiRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ online: true });
  }
}
