'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

// **** security **** //
const CakesSchemas = require('../security/Cakes');

// **** providers **** //
const { getLogger } = require('../providers/Logger');

// **** models **** //
const CakesModel = require('../model/Cakes');

// **** utils **** //
const { convertAllToString } = require('../utils/MainHelper');
const HttpHelper = require('../utils/HttpHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const rootPath = '/';
const rootItem = '/:name';

const CakesRoute = express.Router();
const logger = getLogger('CakesRoute');

// ############################################################################################################### //
// #                                              CALLBACKS ENDPOINT                                             # //
// ############################################################################################################### //

/**
 * 
 * @description Callback to create a new cake 
 * @private
 * @function
 * @param {Object} req 
 * @param {Object} res
 *  
 */
function createItem( req, res ) {
    const logTrace = uuidv4();
    const method = 'POST';
    const { errors } = validationResult(req);
    const errorDetailList = HttpHelper.filterDataArray(errors, 'msg');

    if ( errorDetailList.length === 0 ) {
        logger.debug(`${logTrace} :: ${req.baseUrl}${rootPath} [${method}] :: Validations passed ::`);

        CakesModel.createItem( req.body )
            .then( result => HttpHelper.responser(logTrace, method, rootPath, result, res) );
    } else {
        HttpHelper.badValidationResponse(logTrace, method, rootPath, errorDetailList, res);
    }
}

/**
 * 
 * @description Callback to create a new cake 
 * @private
 * @function
 * @param {Object} req 
 * @param {Object} res
 *  
 */
function getList( req, res ) {
    const logTrace = uuidv4();
    const method = 'GET';

    logger.debug(`${logTrace} :: ${req.baseUrl}${rootPath} [${method}] :: Validations passed ::`);

    CakesModel.listItem()
        .then( result => HttpHelper.responser(logTrace, method, rootPath, result, res) );
}

/**
 * 
 * @description Callback to create a new cake 
 * @private
 * @function
 * @param {Object} req 
 * @param {Object} res
 *  
 */
function getItem( req, res ) {
    const logTrace = uuidv4();
    const method = 'GET';
    const { errors } = validationResult(req);
    const errorDetailList = HttpHelper.filterDataArray(errors, 'msg');

    if ( errorDetailList.length === 0 ) {
        logger.debug(`${logTrace} :: ${req.baseUrl}${rootItem} [${method}] :: Validations passed ::`);
        CakesModel.findItem( req.params.name )
            .then( result => HttpHelper.responser(logTrace, method, rootPath, result, res) );
    } else {
        HttpHelper.badValidationResponse(logTrace, method, rootPath, errorDetailList, res);
    }
}

/**
 * 
 * @description Callback to create a new cake 
 * @private
 * @function
 * @param {Object} req 
 * @param {Object} res
 *  
 */
function updateItem( req, res ) {
    const logTrace = uuidv4();
    const method = 'PATCH';
    const { errors } = validationResult(req);
    const errorDetailList = HttpHelper.filterDataArray(errors, 'msg');

    if ( errorDetailList.length === 0 ) {
        const name = req.params.name;
        const documentUpd = req.body;

        logger.debug(`${logTrace} :: ${req.baseUrl}${rootItem} [${method}] :: Validations passed ::`);

        CakesModel.updateItem( name, documentUpd )
            .then( result => HttpHelper.responser(logTrace, method, rootPath, result, res) );

    } else {
        HttpHelper.badValidationResponse(logTrace, method, rootPath, errorDetailList, res);
    }
}

/**
 * 
 * @description Callback to create a new cake 
 * @private
 * @function
 * @param {Object} req 
 * @param {Object} res
 *  
 */
function deleteItem( req, res ) {
    const logTrace = uuidv4();
    const method = 'DELETE';
    const { errors } = validationResult(req);
    const errorDetailList = HttpHelper.filterDataArray(errors, 'msg');

    if ( errorDetailList.length === 0 ) {
        logger.debug(`${logTrace} :: ${req.baseUrl}${rootItem} [${method}] :: Validations passed ::`);
        CakesModel.removeItem( req.params.name )
            .then( result => HttpHelper.responser(logTrace, method, rootPath, result, res) );
    } else {
        HttpHelper.badValidationResponse(logTrace, method, rootPath, errorDetailList, res);
    }
}

// ############################################################################################################### //
// #                                               ENDPOINT ROUTE                                                # //
// ############################################################################################################### //

CakesRoute.post( rootPath, checkSchema(CakesSchemas.CREATEITEM_SCHEMA), createItem );

CakesRoute.get( rootPath, getList);

CakesRoute.get( rootItem, checkSchema(CakesSchemas.PARAM_NAME_SCHEMA), getItem );

CakesRoute.patch( rootItem, checkSchema(CakesSchemas.UPDATEITEM_SCHEMA), updateItem );

CakesRoute.delete( rootItem, checkSchema(CakesSchemas.PARAM_NAME_SCHEMA), deleteItem );

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = CakesRoute;
