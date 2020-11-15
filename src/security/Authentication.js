'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** providers **** //
const { SERVER_PROPS } = require('../providers/Properties');

// **** utils **** //
const { HTTP_CODES, CUSTOM_MESSAGES } = require('../utils/ConstantsHttp');
const { buildResponse } = require('../utils/HttpHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const authCredentials = SERVER_PROPS.api.auth;

/**
 * 
 * @description Back autorization for this endpoint
 * @private
 * @function
 * @param {object} req
 * @returns {object} body response
 * 
 */
function getUnauthorizedResponse( req ) {
    const httpCode = HTTP_CODES.UNAUTHORIZED;
    const message = req.auth ? CUSTOM_MESSAGES.BAD_AUTH : CUSTOM_MESSAGES.NO_CRED;

    return buildResponse(httpCode, message);
}

const AUTHORIZER = Object.freeze({
    users: { [authCredentials.username]: authCredentials.password },
    unauthorizedResponse: getUnauthorizedResponse
});

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { AUTHORIZER };
