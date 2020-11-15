'use strict';

// ############################################################################################################### //
// #                                                DEVELOPMENT                                                  # //
// ############################################################################################################### //

/**
 * @description Valida params para peticion getInfoByVehicle
 * @public
 */
const PARAM_NAME_SCHEMA = Object.freeze({
    name: {
        in: ['params'],
        isEmpty: false,
        errorMessage: 'Name must exist and be a string'
    }
});

/**
 * @description Valida params para peticion getInfoByVehicle
 * @public
 */
const CREATEITEM_SCHEMA = Object.freeze({
    name: {
        in: ['body'],
        isEmpty: {
            errorMessage: 'Name can\'t be empty',
            negated: true
        },
        isAlpha: {
            errorMessage: 'Name only containt A-Z',
            negated: false
        }
    },
    price: {
        in: ['body'],
        isFloat: {
            errorMessage: 'Price must be float value',
            options: {
                min: 0.1
            }
        },
        isDecimal: {
            errorMessage: 'Price must have a decimal',
            options: {
                force_decimal: false
            }
        }
    },
    'flavors.*': {
        isEmpty: {
            errorMessage: 'Flavor be not empty',
            negated: true
        },
        isAlpha: {
            errorMessage: 'Flavor only containt A-Z',
            negated: false
        }
    },
    flavors: {
        in: ['body'],
        isLength: {
            options:  {
                min: 1
            },
            errorMessage: 'Flavors must have a one element'
        }
    }
});

/**
 * @description Valida params para peticion getInfoByVehicle
 * @public
 */
const UPDATEITEM_SCHEMA = Object.freeze({
    name: {
        in: ['params'],
        isEmpty: {
            errorMessage: 'Name can\'t be empty',
            negated: true
        },
        isAlpha: {
            errorMessage: 'Name only containt A-Z',
            negated: false
        }
    },
    price: {
        in: ['body'],
        isFloat: {
            errorMessage: 'Price must be float value',
            options: {
                min: 0.1
            }
        },
        isDecimal: {
            errorMessage: 'Price must have a decimal',
            options: {
                force_decimal: false
            }
        }
    },
    'flavors.*': {
        isEmpty: {
            errorMessage: 'Flavor be not empty',
            negated: true
        },
        isAlpha: {
            errorMessage: 'Flavor only containt A-Z',
            negated: false
        }
    },
    flavors: {
        in: ['body'],
        isLength: {
            options:  {
                min: 1
            },
            errorMessage: 'Flavors must have a one element'
        }
    }
});

// ############################################################################################################### //
// #                                                MODULE EXPORTS                                               # //
// ############################################################################################################### //

module.exports = {
    PARAM_NAME_SCHEMA,
    CREATEITEM_SCHEMA,
    UPDATEITEM_SCHEMA
};
