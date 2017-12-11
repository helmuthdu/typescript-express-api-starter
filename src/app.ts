import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import { ApiRoutes } from './routes';
import { logger } from './services';

const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

/**
 * The server.
 *
 * @class Server
 */
export class Server {

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

    // add api
    this.api();
  }

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  static bootstrap (): Server {
    return new Server();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api () {
    // empty for now
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
        write: message => logger.info(message.trim())
      }
    } as morgan.Options));

    // mount json form parser
    this.app.use(bodyParser.json({ limit: '50mb' }));

    // mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // mount override?
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(methodOverride());

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
   * @method config
   * @return void
   */
  private routes () {
    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}
