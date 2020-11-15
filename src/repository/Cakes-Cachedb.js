'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const NodeCache = require('node-cache');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const cakesCache = new NodeCache();

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
    return new Promise( ( resolve, reject ) => {
        const exists = cakesCache.has( document.name );

        if ( exists ) {
            reject(`${document.name} cake wasn't created successfully, key duplicated`);
        } else {
            const success = cakesCache.set( document.name, document );
            if (success) {
                resolve(`${document.name} cake was created successfully`);
            } else {
                reject(`${document.name} cake wasn't created successfully`);
            }
        }
    });
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
    return new Promise( ( resolve, reject ) => {
        const exists = cakesCache.has( name );

        if (exists) {
            const success = cakesCache.set( name, {...documentUpd, name} );
            if (success) {
                resolve(`${name} cake was updated successfully`);
            } else {
                reject(`${name} cake wasn't updated successfully`);
            }
        } else {
            reject(`${name} cake not exist to be update`);
        }
    });
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
    return new Promise( ( resolve, reject ) => {
        const exists = cakesCache.has( name );

        if (exists) {
            const success = cakesCache.del( name );
            if (success) {
                resolve(`${name} cake was removed successfully`);
            } else {
                reject(`${name} cake wasn't removed successfully`);
            }
        } else {
            reject(`${name} cake not exist to be update`);
        }
    });
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
    return new Promise( resolve =>  {
        const exists = cakesCache.has( name );

        if (exists) {
            
            resolve( cakesCache.get( name ) );
            
        } else {
            resolve( null );
        }
    });
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
    return new Promise( resolve => {
        const keys = cakesCache.keys();
        const data = [];

        for(const key of keys) {
            data.push( cakesCache.get( key ) );
        }

        resolve( data );
    });
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