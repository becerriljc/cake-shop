'use strict';

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

/**
 * @description Convierte cualquier tipo de dato a string
 * @public
 * @function
 * @param {any} anywhere 
 * @returns {string} result
 */
function convertAllToString(anywhere) {
    return JSON.stringify(anywhere);
}

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { convertAllToString };
