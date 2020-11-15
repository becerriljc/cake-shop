'use strict';

// ############################################################################################################### //
// #                                                   DEVELOPMENT                                               # //
// ############################################################################################################### //

// **** nombre de los eventos de Mongoose **** //
const MONGOOSE_EVENTS = Object.freeze({
    OPEN: 'open',
    ERROR: 'error',
    CONNECTING: 'connecting',
    DISCONNECTING: 'disconnecting',
    DISCONNECTED: 'disconnected',
    CLOSE: 'close',
    RECONNECTED: 'reconnected',
    RECONNECTFAILED: 'reconnectFailed'
});

// **** rutas principales app **** //
const ROUTES_APP = Object.freeze({
    APP: 'app',
    CAKE_SHOP: 'cakes',
});

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = { MONGOOSE_EVENTS, ROUTES_APP };
