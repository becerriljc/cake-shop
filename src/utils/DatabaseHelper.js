'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** providers **** //
const { getLogger } = require('../providers/Logger');

// **** utils **** //
const { convertAllToString } = require('./MainHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const logger = getLogger('DatabaseHelper');

/**
 * 
 * @description Procesa las respuestas de operaciones
 * @public
 * @function
 * @param {string} operationName
 * @param {object} error 
 * @param {object} doc 
 * @param {function} resolve 
 * @param {function} reject 
 * 
 */
function processAnswer(operationName, error, opResult, successMsg, resolve, reject) {
    if (error) {
        logger.error(`${operationName} => error :: details: ${convertAllToString(error.message)}`);
        reject(error.message);
    } else {
        logger.verbose(`${operationName} => success :: description: ${convertAllToString(opResult)}`);
        resolve( successMsg );
    }
}

/**
 * 
 * @description
 * @public
 * @function
 * @param {string} operationName 
 * @param {object} error 
 * @param {object} findSingleObject 
 * @param {function} resolve 
 * @returns {Promise<object>} result
 *  
 */
function processFindResult(operationName, error, findSingleObject, resolve) {
    if (error) {
        logger.error(`${operationName} => error :: details: ${convertAllToString(error)}`);
        resolve( null );
    } else {
        logger.verbose(`${operationName} => success :: return ${convertAllToString(findSingleObject)}`);
        resolve(findSingleObject);
    }
}

/**
 * 
 * @description
 * @public
 * @function
 * @param {string} operationName 
 * @param {object} error 
 * @param {Array<object>} findArrayObject 
 * @param {function} resolve 
 * @returns {Promise<object>} result
 *  
 */
function processFindResults(operationName, error, findArrayObject, resolve) {
    if (error) {
        logger.error(`${operationName} => error :: details: ${convertAllToString(error)}`);
        resolve( [ ] );
    } else {
        logger.verbose(`${operationName} => success :: return ${findArrayObject.length} items`);
        resolve(findArrayObject);
    }
}

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    processAnswer,
    processFindResult,
    processFindResults
};
