'use strict';
const jwtSecret = require('../config/config').jwtSecret;

const NOT_AUTH = {
    error: {
        code: error.auth.notAuthorized.code,
        desc: i18n.__(error.auth.notAuthorized.message)
    }
};

const TKN_EXP = {
    code: error.auth.tokenExpired.code,
    desc: i18n.__(error.auth.tokenExpired.message)
};

const NOT_FOUND = {
    error: {
        code: error.global.notFound.code,
        desc: i18n.__(error.global.notFound.message)
    }
};

const GENERAL = {
    error: {
        code: error.global.general.code,
        desc: i18n.__(error.global.general.message)
    }
};

module.exports = app => {
    app.use((err, req, res, next) => {
        if (process.env.NODE_ENV != "test") {
            console.log(moment().format('DD/MM/YYYY HH:mm - ') + (err.message ? helper.dynamici18nString(err.message) : err));
            console.log(err.stack);
        }

        if (err && err.status == error.statusCode.authorizationErr) {

            if (err.inner.name != "TokenExpiredError") {
                return res.status(error.statusCode.authorizationErr).json();
            }

            const oldToken = req.headers.authorization.substring(7);
            new Auth(jwtSecret).getRefreshToken(oldToken, function (err, newToken) {
                if (err) {
                    return res.status(error.statusCode.authorizationErr).json(NOT_AUTH);
                }

                err = TKN_EXP;
                err.refreshed_token = newToken;
                return res.status(error.statusCode.authorizationErr).json({error: err});
            });
        }
        else if (err && err.statusCode == error.statusCode.notFoundErr) {
            return res.status(error.statusCode.notFoundErr).json(NOT_FOUND);
        }
        else {
            if (process.env.NODE_ENV == "production") {
                if (err.code)
                    return res.status(err.statusCode || error.statusCode.serverErr).json({
                        error: {
                            code: err.code,
                            desc: helper.dynamici18nString(err.message)
                        }
                    });
            }

            return res.status(error.statusCode.generalErr).json(GENERAL);
        }
    });
};
