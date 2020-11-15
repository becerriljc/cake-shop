'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** providers **** //
const properties = require('../../properties/application.properties');

// ############################################################################################################### //
// #                                                 DEVELOPMENT                                                 # //
// ############################################################################################################### //

/**
 * @description Obtiene las propiedades del server
 * @returns {object} server properties
 */
const SERVER_PROPS = Object.freeze({ ...properties.SERVER });

/**
 * @description
 * @returns {object} logger properties
 */
const LOGGER_PROPS = Object.freeze({ ...properties.LOGGER });

/**
 * @description
 * @returns {object} mongodb properties
 */
const MONGODB_PROPS = Object.freeze({ ...properties.MONGO_DATABASE });

/**
 * @description
 * @returns {object} cachedb properties
 */
const CACHEDB_PROPS = Object.freeze({ ...properties.CACHE_LOCAL });

const SAVE_DATA = properties.SAVE_DATA;

// ############################################################################################################### //
// #                                                 MODULE EXPORTS                                              # //
// ############################################################################################################### //

module.exports = { 
    SERVER_PROPS,
    LOGGER_PROPS,
    MONGODB_PROPS,
    CACHEDB_PROPS,
    SAVE_DATA 
};
