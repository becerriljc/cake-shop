'use strict';

// ############################################################################################################### //
// #                                                   PROPERTIES                                                # //
// ############################################################################################################### //

// **** server **** //
const SERVER = Object.freeze({
    app_name: 'Cake Shop Management API',
    port: 3000,
    pingInterval: 10000,
    pingTimeout: 5000,
    api: {
        baseUrl: 'api',
        version: 'v1',
        auth: {
            username: 'wizeline01',
            password: 'Wiz3l1ne=$%!'
        }
    }
});

// **** logger **** //
const LOGGER = Object.freeze({
    level: 'debug',
    general: {
        transport: {
            dirname: './logs',
            filename: 'general-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '15d'
        }
    }
});

// **** mongo database **** //
const MONGO_DATABASE = Object.freeze({
    url: 'mongodb://localhost:8001',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: 'wizeline',
        poolSize: 10,
        keepAlive: true,
        keepAliveInitialDelay: 300000
    },
    replicaSet: 'enkrealtime'
});

const CACHE_LOCAL = Object.freeze({});

// **** default data save **** //
// 1 - MONGODB
// 2 - CACHE
const SAVE_DATA = 2;

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { SERVER, LOGGER, MONGO_DATABASE, CACHE_LOCAL, SAVE_DATA };
