import { Server } from './app';
import { config } from './config';

// const debug = require('debug')('express:server');

// create http server
export const server = Server.bootstrap().app;
server.listen(process.env.PORT || config.port);
