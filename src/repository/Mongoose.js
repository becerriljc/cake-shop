'use strict';

// ############################################################################################################### //
// #                                                SETTINGS                                                     # //
// ############################################################################################################### //

// **** dependencies **** //
const mongoose = require('mongoose');

// **** providers **** //
const { getLogger } = require('../providers/Logger');
const { MONGODB_PROPS } = require('../providers/Properties');

// **** utils **** //
const { MONGOOSE_EVENTS } = require('../utils/Constants');
const { convertAllToString } = require('../utils/MainHelper');

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

const logger = getLogger('Mongoose');

const connectionDb = mongoose.connection;


const replicaSet = MONGODB_PROPS.replicaSet;
const paramReplicaSet = replicaSet ? `?replicaSet=${replicaSet}` : '';
const connectionUrl = `${MONGODB_PROPS.url}/${paramReplicaSet}`;

logger.verbose(`connection url: ${connectionUrl}`);

connectionDb.once(MONGOOSE_EVENTS.OPEN, () => logger.info(`ready to use, connection to MongoDb >> ${connectionUrl} >> SUCCESS ::`) );

connectionDb.on(MONGOOSE_EVENTS.ERROR, (err) => logger.error(`Oops, occurs an error: ${ convertAllToString(err) }`) );

connectionDb.on(MONGOOSE_EVENTS.CONNECTING, () => logger.verbose(`Server is trying connect to MongoDb >> ${connectionUrl}`) );

connectionDb.on(MONGOOSE_EVENTS.DISCONNECTING , (reason) => logger.warn(`Server disconnecting to MongoDb :: reason? ${convertAllToString(reason)}`) );

connectionDb.on(MONGOOSE_EVENTS.DISCONNECTED, (reason) => logger.warn(`Server disconnected to MongoDb :: reason? ${convertAllToString(reason)}`) );

connectionDb.on(MONGOOSE_EVENTS.CLOSE, (reason) => logger.warn(`Server close connection to MongoDb :: reason? ${convertAllToString(reason)}`) );

connectionDb.on(MONGOOSE_EVENTS.RECONNECTED, () => logger.warn(`Server reconnected to MongoDb ::`) );

connectionDb.on(MONGOOSE_EVENTS.RECONNECTFAILED, (reason) => logger.error(`Server reconnect failed to MongoDb :: reason? ${convertAllToString(reason)}`) );

/**
 * 
 * @description Regresa el estatus de la conexión
 * @public
 * @function
 * @returns {Promise<boolean>}
 * 
 */
function setConnectMongo() {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionUrl, MONGODB_PROPS.options)
            .then(() => resolve(true) )
            .catch(err => {
                logger.error(`setConnectMongo :: Oops, occurs an error: ${ convertAllToString(err) }`);
                    
                reject(false);    
            });
    });
}

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { setConnectMongo };
