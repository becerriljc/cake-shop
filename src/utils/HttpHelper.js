'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** utils **** //
const constantsHttp = require('./ConstantsHttp');
const { convertAllToString } = require('./MainHelper');

// **** providers **** //
const { getLogger } = require('../providers/Logger');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const logger = getLogger('HttpHelper');

/**
 * 
 * @description Contruye una respuesta con los datos necesarios para el cliente
 * @public
 * @function
 * @param {number} httpCode 
 * @param {string} message 
 * @param {Array<object>} data 
 * @param {Array<string>} errorDetailList 
 * @returns {object}
 * 
 */
function buildResponse(httpCode, message, data = [], errorDetailList = []) {
    const response = { ...constantsHttp.UNIVERSAL_RESPONSE };
    const httpDetails = { ...constantsHttp.RESPONSE_PRELOAD[httpCode] };
    
    response.transactionState = httpDetails.transactionState;
    response.httpResult.resultCode = httpDetails.resultCode;
    response.httpResult.description = httpDetails.description;
    response.httpResult.httpCode = httpCode;
    response.httpResult.errorDetails = [...errorDetailList];
    response.httpResult.message = message;
    response.timestamp = new Date().getTime();
    response.content = data;
    
    return response;
}

/**
 * 
 * @description Envia la respuesta al cliente de su solicitud
 * @public
 * @function
 * @param {string} logTrace 
 * @param {string} method 
 * @param {string} uri 
 * @param {object} result 
 * @param {callback} res
 *  
 */
function responser(logTrace, method, uri, result, res) {
    logger.verbose(`${logTrace} :: [${method}]  ${uri} :: response => ${convertAllToString(result)}`);
    res.status(result.httpResult.httpCode).json(result);
}

/**
 * 
 * @description Construye una validación por tener invalida la autenticacion y/o solicitud
 * @public
 * @function
 * @param {string} logTrace 
 * @param {string} method 
 * @param {string} uri  
 * @param {Array<string>} errorDetailList 
 * @param {callback} res 
 * 
 */
function badValidationResponse(logTrace, method, uri, errorDetailList, res) {
    const response = buildResponse(
        constantsHttp.HTTP_CODES.BAD_REQUEST, 
        constantsHttp.CUSTOM_MESSAGES.BAD_BODY, 
        [], 
        errorDetailList
    );

    responser(logTrace, method, uri, response, res);
}

/**
 * @description Filtra el campo enviado de un arreglo
 * @public
 * @function
 * @param {Array<object>} dataList 
 * @param {string} field
 * @returns {Array<any>} result 
 */
function filterDataArray(dataList, field) {
    return dataList.map(item => item[field]);
}

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    responser,
    badValidationResponse,
    buildResponse,
    filterDataArray
};
