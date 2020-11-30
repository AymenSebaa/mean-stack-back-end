var env = process.env.NODE_ENV || 'development';
var config = require('./config.json');
var envConfig = config[env];
Object.keys(envConfig).map(key => process.env[key] = envConfig[key] );