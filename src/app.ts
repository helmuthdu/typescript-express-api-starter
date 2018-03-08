import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';

import { ApiRoutes } from './routes';
import { logger } from './services';

/**
 * The server.
 *
 * @class Server
 */
export class Server {
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap (): Server {
    return new Server();
  }

  public app: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor () {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config () {
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // mount logger
    this.app.use(morgan('tiny', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    } as morgan.Options));

    // mount json form parser
    this.app.use(bodyParser.json({ limit: '50mb' }));

    // mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // mount override?
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(methodOverride());
    this.app.use(expressStatusMonitor());

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes () {
    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}
