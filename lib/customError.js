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
    noPdvAvailable: {statusCode: error.statusCode.notFoundErr, code: "PDV-00006", message: 'pdv.noPdvAvailable'}
};


module.exports = error;
