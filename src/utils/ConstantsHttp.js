'use strict';

// ############################################################################################################### //
// #                                                   DEVELOPMENT                                               # //
// ############################################################################################################### //

// **** http codes **** //
const HTTP_CODES = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERROR_SERVER: 500
});

// **** universal response **** //
const UNIVERSAL_RESPONSE = Object.freeze({
    transactionState: '',
    timestamp: 0,
    content: [],
    httpResult: {
        httpCode: 0,
        message: '',
        resultCode: '',
        description: '',
        errorDetails: []
    }
});

// **** default data for response **** //
const RESPONSE_PRELOAD = Object.freeze({
    [ HTTP_CODES.OK ]: {
        transactionState: 'OK',
        resultCode: 'CMS001',
        description: 'Successful application'
    },
    [ HTTP_CODES.CREATED ]: {
        transactionState: 'OK',
        resultCode: 'CMS002',
        description: 'Created'
    },
    [ HTTP_CODES.BAD_REQUEST ]: {
        transactionState: 'NOK',
        resultCode: 'CMS003',
        description: 'Invalid request'
    },
    [ HTTP_CODES.UNAUTHORIZED ]: {
        transactionState: 'NOK',
        resultCode: 'CMS004',
        description: 'Unauthorized user'
    },
    [ HTTP_CODES.NOT_FOUND ]: {
        transactionState: 'NOK',
        resultCode: 'CMS005',
        description: 'Resource not found'
    },
    [ HTTP_CODES.CONFLICT ]: {
        transactionState: 'NOK',
        resultCode: 'CMS006',
        description: 'Conflict to resolve request / Duplicated register'
    },
    [ HTTP_CODES.ERROR_SERVER ]: {
        transactionState: 'NOK',
        resultCode: 'CMS007',
        description: 'Error no determinado'
    }
});

// **** custom messages **** //
const CUSTOM_MESSAGES = Object.freeze({
    NO_CRED: 'No credentials',
    BAD_AUTH: 'Wrong username or password',
    BAD_BODY: 'Some fields do not meet the validation rules',
    SUCCESS: 'Success',
    EMPTY: 'Empty data',
    OP_ERROR: 'Operation error'
});

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    HTTP_CODES,
    UNIVERSAL_RESPONSE,
    RESPONSE_PRELOAD,
    CUSTOM_MESSAGES
};
