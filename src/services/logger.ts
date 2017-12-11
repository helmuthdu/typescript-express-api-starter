import * as fs from 'fs';
import * as winston from 'winston';

const PATHS = {
  LOG: `${process.cwd()}/logs`,
  LOG_INFO: `${process.cwd()}/logs/_info.log`,
  LOG_ERROR: `${process.cwd()}/logs/_error.log`
};
// ensure log directory exists
(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();

export const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      name: 'info',
      level: 'info',
      filename: PATHS.LOG_INFO,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 2,
      colorize: false
    }),
    new (winston.transports.File)({
      name: 'error',
      level: 'error',
      filename: PATHS.LOG_ERROR,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 2,
      colorize: false
    }),
    new winston.transports.Console({
      name: 'debug',
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});
