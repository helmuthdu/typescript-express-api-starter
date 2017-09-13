/**
 * Constructor
 *
 * @class BaseRoute
 */
import { Router } from 'express';
import * as sql from 'mssql';
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

    connect (name: string) {
        if (!this.connection[name]) {
            this.connection[name] = new sql.ConnectionPool(sqlConfig(name));
        } else {
            this.connection[name].close();
        }

        return this.connection[name].connect();
    }
}
