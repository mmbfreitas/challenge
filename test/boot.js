"use strict";

let async = require('async');
let app = require('../index.js');
let request = require("supertest");
let chai = require("chai");
let sinon = require('sinon');
const jwt = require('jsonwebtoken');
const _TEST_TIMEOUT = 10000;
const _config = require('../config/config');

global.async = async;
global.app = app;
global.request = request(app);
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.jwt = jwt;
global.TEST_TIMEOUT = _TEST_TIMEOUT;
global.io = { sockets: { connected: {} } };
global.versionApi = 'v1';
global.secretKey = _config.jwtSecret;
global.config = _config;

global.getAuthorization = (payload, secretKey) => {
    const token = jwt.sign(payload, secretKey);
    return `Bearer ${token}`
};