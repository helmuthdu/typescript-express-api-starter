import * as config from 'config';
import { Server } from './app';

// create http server
export const app = Server.bootstrap().app;
const port = process.env.PORT || config.get('port');
export const server = app.listen(port);
