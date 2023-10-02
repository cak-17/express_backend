require('dotenv').config();

const APP_NAME = 'ExpressJS API Backend'
const DATABASE = {
    'DB_USER': process.env.ATLAS_DB_USER,
    'DB_PASS': process.env.ATLAS_DB_PSW,
    'DB_HOST': process.env.ATLAS_DB_HOST,
};

const DEFAULT_PORT = 8000;
const DEFAULT_HOST = '0.0.0.0';
const DEFAULT_DEV_HOST = 'localhost';
const DEFAULT_RETRY = 5;

module.exports = {
    DATABASE,
    DEFAULTS: {
        PORT: DEFAULT_PORT,
        HOST: DEFAULT_HOST,
        DEV_HOST: DEFAULT_DEV_HOST,
        RETRY: DEFAULT_RETRY,
        APP_NAME
    }
}