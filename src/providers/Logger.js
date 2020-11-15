'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependences **** //
const winston = require('winston');
require('winston-daily-rotate-file');

const winstonFormat = winston.format;
const myFormat = winstonFormat.printf( ({ level, message, label, timestamp }) => `${timestamp} :: ${level} :: [${label}] :: ${message}` );

// **** providers **** //
const { LOGGER_PROPS } = require('./Properties');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const loggers = {};

/**
 * 
 * @description Crea un nuevo logger, con el nombre de la clase
 * @private
 * @function
 * @param {string} classname
 * @param {string} loggerTypename
 * @returns {object} logger
 * 
 */
function create(classname, loggerTypename = 'general') {

    const logger = winston.createLogger({
        level: LOGGER_PROPS.level,
        format: winstonFormat.combine(
            winstonFormat.label({ label: classname }),
            winstonFormat.timestamp(),
            myFormat
        ),
        transports: [
            new winston.transports.DailyRotateFile(LOGGER_PROPS[loggerTypename].transport)
        ]
    });

    return logger;

}

/**
 * 
 * @description Obtiene el logger de la clase, sino existe lo crea
 * @public
 * @function
 * @param {string} classname
 * @param {string} loggerTypename
 * @returns {object} logger
 * 
 */
function getLogger(classname, loggerTypename = 'general') {
    if( !loggers[classname] ) {
        loggers[classname] = create(classname, loggerTypename);
    }

    return loggers[classname];
}

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    getLogger
};
