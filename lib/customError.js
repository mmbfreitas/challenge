'use strict';

let error =  {};

error.statusCode = {
    invalidParams: 400,
    authorizationErr: 401,
    notFoundErr: 404,
    serverErr: 412,
    generalErr: 500
};

error.global = {
    general: {statusCode: error.statusCode.generalErr, code:"GLO-00001", message: 'global.general'},
    notFound: {statusCode: error.statusCode.notFoundErr, code:"GLO-00002", message: 'global.notFound'},
    notUpdated: {statusCode: error.statusCode.serverErr, code:"GLO-00003", message: 'global.notUpdated'}
};

error.auth = {
    invalidCredentials: {statusCode: error.statusCode.invalidParams, code: "AUT-00001", message: 'auth.invalidCredentials'},
    notAuthorized: {statusCode: error.statusCode.authorizationErr, code: "AUT-00002", message: 'auth.notAuthorized'},
    tokenExpired: {statusCode: error.statusCode.authorizationErr, code: "AUT-00003", message: 'auth.tokenExpired'}
};

error.pdv = {
    noId: {statusCode: error.statusCode.invalidParams, code: "PDV-00001", message: 'pdv.noId'},
    noLatitude: {statusCode: error.statusCode.invalidParams, code: "PDV-00002", message: 'pdv.noLatitude'},
    noLongitude: {statusCode: error.statusCode.invalidParams, code: "PDV-00003", message: 'pdv.noLongitude'},
    errLatitude: {statusCode: error.statusCode.invalidParams, code: "PDV-00004", message: 'pdv.errLatitude'},
    errLongitude: {statusCode: error.statusCode.invalidParams, code: "PDV-00005", message: 'pdv.errLongitude'},
    noPdvAvailable: {statusCode: error.statusCode.notFoundErr, code: "PDV-00006", message: 'pdv.noPdvAvailable'},
    noTradingName: {statusCode: error.statusCode.notFoundErr, code: "PDV-00007", message: 'pdv.noTradingName'},
    noOwnerName: {statusCode: error.statusCode.notFoundErr, code: "PDV-00008", message: 'pdv.noOwnerName'},
    noDocument: {statusCode: error.statusCode.notFoundErr, code: "PDV-00009", message: 'pdv.noDocument'},
    errDocument: {statusCode: error.statusCode.notFoundErr, code: "PDV-00010", message: 'pdv.errDocument'},
    noCoveragePoints: {statusCode: error.statusCode.notFoundErr, code: "PDV-00011", message: 'pdv.noCoveragePoints'},
    errCoveragePointsLength: {statusCode: error.statusCode.notFoundErr, code: "PDV-00012", message: 'pdv.errCoveragePointsLength'},
    errCoveragePointsValidation: {statusCode: error.statusCode.notFoundErr, code: "PDV-00012", message: 'pdv.errCoveragePointsValidation'},
    noPolygon: {statusCode: error.statusCode.notFoundErr, code: "PDV-00012", message: 'pdv.noPolygon'},
    noAddress: {statusCode: error.statusCode.notFoundErr, code: "PDV-00013", message: 'pdv.noAddress'},
    errAddressPoints: {statusCode: error.statusCode.notFoundErr, code: "PDV-00014", message: 'pdv.errAddressPoints'}
};


module.exports = error;
