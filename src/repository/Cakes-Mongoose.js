'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const mongoose = require('mongoose');

// **** utils **** //
const ConstantsDb = require('../utils/ConstantsDb');
const DatabaseHelper = require('../utils/DatabaseHelper'); 

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const Schema = mongoose.Schema;
const model = mongoose.model;

const MODELNAME = 'cakes';

const CAKES_SCHEMA = new Schema({
    name : {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    flavors : [{
        type: String,
        required: true
    }]
}, {
    writeConcern: ConstantsDb.WRITE_CONCERN
});

const CAKES_MODEL = model( MODELNAME, CAKES_SCHEMA );

/**
 * 
 * @description Register a new cake
 * @public
 * @function
 * @param {Object} [document] document
 * @param {String} [document.name] name
 * @param {Number} [document.price] price
 * @param {Array<String>} [document.flavors] flavors
 * @returns {Promise<Object>} result
 * 
 */
function create( document ) {
    return new Promise( ( resolve, reject ) => 
        CAKES_MODEL.create( document, ( error, writeOpResult ) => 
            DatabaseHelper.processAnswer( `${MODELNAME} :: create`, error, writeOpResult, `${document.name} cake was created successfully`, resolve, reject ) ) );
}

/**
 * 
 * @description Update a cake by name filter
 * @public
 * @function
 * @param {String} name 
 * @param {Object} documentUpd
 * @param {String} [documentUpd.name] name
 * @param {Number} [documentUpd.price] price
 * @param {Array<String>} [documentUpd.flavors] flavors
 * @returns {Promise<Object>} result
 * 
 */
function update( name, documentUpd ) {
    return new Promise( ( resolve, reject ) => 
        CAKES_MODEL.updateOne( { name }, documentUpd, ( error, writeOpResult ) => 
            DatabaseHelper.processAnswer( `${MODELNAME} :: update`, error, writeOpResult, `${name} cake was updated successfully`, resolve, reject ) ) );
}

/**
 * 
 * @description Delete a cake by name filter
 * @public
 * @function
 * @param {String} name 
 * @returns {Promise<Object>} result
 * 
 */
function remove( name ) {
    return new Promise( ( resolve, reject ) => 
        CAKES_MODEL.deleteOne( { name }, ( error, writeOpResult ) => 
            DatabaseHelper.processAnswer( `${MODELNAME} :: delete`, error, writeOpResult, `${name} cake was removed successfully`, resolve, reject ) ) );
}

/**
 * 
 * @description Find a cake by name filter
 * @public
 * @function
 * @param {String} name 
 * @returns {Promise<Object>} result
 * 
 */
function find( name ) {
    return new Promise( resolve => 
        CAKES_MODEL.findOne( { name }, ( error, document ) => 
            DatabaseHelper.processFindResult( `${MODELNAME} :: find`, error, document, resolve ) ) );
}

/**
 * 
 * @description Find cake list
 * @public
 * @function
 * @returns {Promise<Object>} result
 * 
 */
function list( ) {
    return new Promise( resolve => 
        CAKES_MODEL.find( { }, ( error, documents ) => 
            DatabaseHelper.processFindResults( `${MODELNAME} :: list`, error, documents, resolve ) ) );
}


// ############################################################################################################################################### //
// #                                                                        MODULE EXPORTS                                                       # //
// ############################################################################################################################################### //

module.exports = {
    create,
    update,
    remove,
    find,
    list
};
