'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const express = require('express');

// **** providers **** //
const { getLogger } = require('../providers/Logger');

// **** utils **** //
const { HTTP_CODES } = require('../utils/ConstantsHttp');
const { convertAllToString } = require('../utils/MainHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const HealthRoute = express.Router();
const logger = getLogger('HealthRoute');

HealthRoute.get('/health', (req, res) => {
    logger.debug(`/health [GET] :: req => ${ convertAllToString( req ) }`);

    res.status( HTTP_CODES.OK ).json({
        status: 'OK'
    });

});


// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = HealthRoute;