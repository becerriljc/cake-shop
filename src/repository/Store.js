'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** providers ***** //
const { SAVE_DATA } = require('../providers/Properties');

// **** repository **** //
const Cakes_Mongoose = require('./Cakes-Mongoose');
const Cakes_CacheDb = require('./Cakes-Cachedb');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

/**
 * @description Dictionary of databases
 */
const DB_DICTIONARY = {
    1: Cakes_Mongoose,
    2: Cakes_CacheDb
};

const DB_CONGIG = DB_DICTIONARY[ SAVE_DATA ];

/**
 * 
 * @description
 * @param {Object} database
 * 
 */
function STORE_OPERATIONS( database ) {

    return {
        create: ( document ) => database.create( document ),
        update: ( name, documentUpd ) => database.update( name, documentUpd ),
        remove: ( name ) => database.remove( name ),
        find: ( name ) => database.find( name ),
        list: () => database.list(),
    };

}

const STORE = STORE_OPERATIONS( DB_CONGIG );

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { STORE };
