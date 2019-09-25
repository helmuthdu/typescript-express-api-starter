import { NextFunction, Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as Loki from 'lokijs';
import * as multer from 'multer';
import * as path from 'path';
import { fileFilter, loadLocalDB, logger } from '../../services';

const DB_NAME = 'db.json';
const COLLECTION_NAME = 'files';
const UPLOAD_PATH = 'public/uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

/**
 * @api {get} /upload Upload request object
 * @apiName Upload
 * @apiGroup Upload
 *
 * @apiSuccess {String} type Json Type.
 */
export class UploadRoute {
  public static path = '/upload';
  private static instance: UploadRoute;
  private router = Router();

  /**
   * @class UploadRoute
   * @constructor
   */
  private constructor() {
    // log
    logger.info('[UploadRoute] Creating Upload route.');

    this.router.get('/file/:id', this.getFile);
    this.router.get('/files', this.getFiles);
    this.router.post('/file', upload.single(''), this.addFile);
    this.router.post('/files', upload.array(''), this.addFiles);
  }

  static get router() {
    if (!UploadRoute.instance) {
      UploadRoute.instance = new UploadRoute();
    }
    return UploadRoute.instance.router;
  }

  /**
   * @class UploadRoute
   * @method getFile
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const id: any = req.params.id;

      const result = col.get(id);

      if (!result) {
        res.sendStatus(404);
        return;
      }

      res.setHeader('Content-Type', result.mimetype);
      fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  };

  /**
   * @class UploadRoute
   * @method getFiles
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private getFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      res.send(col.data);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  };

  /**
   * @class UploadRoute
   * @method addFile
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private addFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const data = col.insert(req.file);

      db.saveDatabase();
      res.send({
        fileName: data.filename,
        id: data.$loki,
        originalName: data.originalname,
      });
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  };

  /**
   * @class UploadRoute
   * @method addFiles
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private addFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const data = [].concat(col.insert(req.files));

      db.saveDatabase();
      res.send(
        data.map((x: any) => ({
          fileName: x.filename,
          id: x.$loki,
          originalName: x.originalname,
        })),
      );
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  };
}
