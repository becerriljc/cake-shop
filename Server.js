'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const process = require('process');
const http = require('http');
const express = require('express');
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// **** package **** //
const specifications = require('./package.json');

// **** security **** //
const { AUTHORIZER } = require('./src/security/Authentication');

// **** utils **** //
const { ROUTES_APP } = require('./src/utils/Constants');

// **** providers **** //
const { SERVER_PROPS } = require('./src/providers/Properties');
const { getLogger } = require('./src/providers/Logger');

// **** repository **** //
const { setConnectMongo } = require('./src/repository/Mongoose');

// **** routes **** //
const HealthRoute = require('./src/routes/Health');
const CakesRoute = require('./src/routes/Cakes');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const app = express();
const pid = process.pid;

const logger = getLogger('Server');
const baseUrl = `${SERVER_PROPS.api.baseUrl}/${SERVER_PROPS.api.version}`;

logger.verbose(':: Inicia creacion de server express() :: ');

logger.verbose(':: Inicia configuraciones de seguridad y rendimiento para servidor express() :: ');

app.use( compression() );
app.use( helmet() );
app.use( cors() );
app.use( basicAuth( AUTHORIZER ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

logger.verbose(':: Termina configuraciones de seguridad y rendimiento para servidor express() :: ');

logger.verbose(':: Inicia integracion de rutas :: ');

app.use( `/${baseUrl}/${ROUTES_APP.APP}`, HealthRoute );
app.use( `/${baseUrl}/${ROUTES_APP.CAKE_SHOP}`, CakesRoute );

logger.verbose(':: Termina integracion de rutas :: ');

const server = http.createServer(app);

logger.verbose(':: Termina creacion de server express() :: ');

// ############################################################################################################### //
// #                                                    RUN APP                                                  # //
// ############################################################################################################### //

/**
 * 
 * @description escribe en log detalles de finalizacion de la app y la finaliza
 * @private
 * @function exitToApp
 * 
 */
function exitToApp() {
    const SIG_END_PROGRAM = 'SIGKILL';
    const date = new Date();
    const killTime = 5000;

    console.log(`:: PROCESO: PROCESS.KILL | PID: ${ pid } | SIG_END_PROGRAM: ${ SIG_END_PROGRAM } | date: ${ date }`);
    logger.warn(`:: PROCESO: PROCESS.KILL | PID: ${ pid } | SIG_END_PROGRAM: ${ SIG_END_PROGRAM } | date: ${ date }`);

    setTimeout(() => process.kill(pid, SIG_END_PROGRAM), killTime);
    
}

/**
 * 
 * @description Get data to print
 * @private
 * @function
 * @returns {Object} [data]
 * 
 */
function getPrintData() {

    return {
        port: SERVER_PROPS.port,
        mode: process.env.NODE_ENV,
        app_name: SERVER_PROPS.app_name,
        version: specifications.version,
        pid: process.pid,
        date: new Date()
    };
}

/**
 * 
 * @description Imprime en logger datos del servidor una vez que ha arrancado
 * @private
 * @function
 * @param {Date} data
 * 
 */
function printLogInitServer(data) {

    logger.info('');
    logger.info('************************************************************************');
    logger.info(` SERVER RUNNING ON PORT: ${data.port}`);
    logger.info(` RUNNING ON ${data.mode} MODE`);
    logger.info(` APPNAME:  ${data.app_name}`);
    logger.info(` VERSION:  ${data.version}`);
    logger.info(` PROCESS ID: ${data.pid}`);
    logger.info(` INIT DATE: ${ data.date } `);
    logger.info('************************************************************************');
    logger.info('');
    
}

/**
 * 
 * @description Imprime en pantalla datos del servidor una vez que ha arrancado
 * @private
 * @function
 * @param {Object} data
 * 
 */
function printCslInitServer(data) {

    console.log('');
    console.log('************************************************************************');
    console.log(` SERVER RUNNING ON PORT: ${data.port}`);
    console.log(` RUNNING ON ${data.mode} MODE`);
    console.log(` APPNAME:  ${data.app_name}`);
    console.log(` VERSION:  ${data.version}`);
    console.log(` PROCESS ID: ${data.pid}`);
    console.log(` INIT DATE: ${ data.date } `);
    console.log('************************************************************************');
    console.log('');

}

/**
 * 
 * @description Se ejecuta en cuanto el server inicia su ejecucion
 * @private
 * @function 
 * 
 */
function printInitServer() {
    const data = getPrintData();

    printLogInitServer( data );

    printCslInitServer( data );
}

try {
    setConnectMongo()
        .then(result => {
            logger.verbose(`init mongo connection success ? ${result} :: proccess to start: Server`);

            server.listen( SERVER_PROPS.port, printInitServer);
            
        }).catch(err => {
            logger.verbose(`init mongo connection success ? ${err} :: proccess to close app`);

            exitToApp();
        });

} catch (error) {
    logger.error(`[MAIN] error details: ${error.message}`);
    exitToApp();
}
