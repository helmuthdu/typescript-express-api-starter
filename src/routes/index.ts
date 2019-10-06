import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { PingRoute } from './ping';
import { UploadRoute } from './upload';

export class ApiRoutes {
  public static path = '/api';
  private static instance: ApiRoutes;
  private router = Router();

  private constructor() {
    logger.info('[ApiRoute] Creating api routes.');

    this.router.get('/', this.get);
    this.router.use(PingRoute.path, PingRoute.router);
    this.router.use(UploadRoute.path, UploadRoute.router);
  }

  static get router() {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ online: true });
  };
}
