const path = require('path');
const shell = require('shelljs');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

shell.cp(path.resolve('./package.json'), path.resolve('./dist/package.json'));
shell.cp('-R', path.resolve('./config/'), path.resolve('./dist/'));
shell.cp(
  isProd ? path.resolve('./pm2/processes.prod.json') : path.resolve('./pm2/processes.dev.json'),
  path.resolve('./dist/processes.json'),
);
