import * as config from 'config';
import { Server } from './app';

// create http server
export const server = Server.bootstrap().app;
server.listen(process.env.PORT || config.get('port'));
