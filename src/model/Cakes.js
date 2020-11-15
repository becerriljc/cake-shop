'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** repository **** //
const { STORE } = require('../repository/Store');

// **** utils **** //
const { HTTP_CODES, CUSTOM_MESSAGES } = require('../utils/ConstantsHttp');
const { buildResponse } = require('../utils/HttpHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

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
function createItem( document ) {
    return new Promise( resolve => STORE.create( document )
        .then( message => resolve( buildResponse( HTTP_CODES.CREATED, message, [document] ) ) )
        .catch(error => resolve( buildResponse( HTTP_CODES.CONFLICT, CUSTOM_MESSAGES.OP_ERROR, [], [ error ] ) ) )
    );
}

/**
 * 
 * @description Update a cake by name filter
 * @public
 * @function
 * @param {String} name 
 * @param {Object} documentUpd
 * @param {Number} [documentUpd.price] price
 * @param {Array<String>} [documentUpd.flavors] flavors
 * @returns {Promise<Object>} result
 * 
 */
function updateItem( name, documentUpd ) {
    return new Promise( resolve => STORE.update( name, documentUpd )
        .then( message => resolve( buildResponse( HTTP_CODES.OK, message, [documentUpd] ) ) )
        .catch(error => resolve( buildResponse( HTTP_CODES.CONFLICT, CUSTOM_MESSAGES.OP_ERROR, [], [ error ] ) ) )
    );
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
function removeItem( name ) {
    return new Promise( resolve => STORE.remove( name )
        .then( message => resolve( buildResponse( HTTP_CODES.OK, message, [{ name }] ) ) )
        .catch(error => resolve( buildResponse( HTTP_CODES.CONFLICT, CUSTOM_MESSAGES.OP_ERROR, [], [ error ] ) ) )
    );
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
function findItem( name ) {
    return new Promise( resolve => STORE.find( name )
        .then( item => {
            let message = CUSTOM_MESSAGES.EMPTY;
            const data = [];

            if ( item ) {
                message = CUSTOM_MESSAGES.SUCCESS;

                data.push( item );
            }

            resolve( buildResponse( HTTP_CODES.OK, message, data ) );
        })
    );
}

/**
 * 
 * @description Find cake list
 * @public
 * @function
 * @returns {Promise<Object>} result
 * 
 */
function listItem( ) {
    return new Promise( resolve => STORE.list()
        .then( itemList => {
            const message = itemList.length > 0 ? CUSTOM_MESSAGES.SUCCESS : CUSTOM_MESSAGES.EMPTY;
            resolve( buildResponse( HTTP_CODES.OK, message, itemList ) );
        }) 
    );
}



// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    createItem,
    updateItem,
    removeItem,
    findItem,
    listItem
};
