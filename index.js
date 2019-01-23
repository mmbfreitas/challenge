"use strict";

const express = require('express');
const expressJwt = require('express-jwt');
const app = express();

const https = require('https');
const http = require('http');
const fs = require('fs');
const _moment = require('moment');
const _i18n = require('i18n');
const bodyParser = require('body-parser');


_i18n.configure({
    locales:['en', 'pt-br'],
    defaultLocale: 'en',
    directory: `${__dirname}/lib/locales`,
    objectNotation: true,
    register: global
});

_moment.locale('pt-BR');

global.moment = _moment;
global.i18n = _i18n;
global.helper = require('./lib/helper');
global.error = require('./lib/customError');
global.errorHandler = require('./lib/errorHandler');
const _config = require('./config/config');
global.config = _config;
global.async = require('async');

app.use(bodyParser.json({limit: '12mb'}));

app.use('/doc', express.static('doc'));

app.get('/', (req, res) => {
    res.status(200).json({
        "module": "API is On"
    });
});

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept, Accept-Encoding, Accept-Language,X-Access-Token, X-Key, Authorization");
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
});

require('./routers/_router')(app);

require('./lib/errorHandler')(app);

if (!module.parent) {
    const server = require('http').createServer(app);

    server.listen(process.env.PORT || 4000, () => {
        console.log(
          'api listening at http://%s:%s',
          server.address().address,
          server.address().port
        );
    });
}

module.exports = app;