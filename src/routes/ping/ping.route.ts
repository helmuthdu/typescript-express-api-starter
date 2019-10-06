import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';

export class PingRoute {
  public static path = '/ping';
  private static instance: PingRoute;
  private router = Router();

  private constructor() {
    logger.info('[PingRoute] Creating ping route.');

    this.router.get('/', this.get);
  }

  static get router() {
    if (!PingRoute.instance) {
      PingRoute.instance = new PingRoute();
    }
    return PingRoute.instance.router;
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    res.json('pong');
    next();
  };
}
