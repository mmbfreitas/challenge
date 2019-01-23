'use strict';

const express = require('express');
const requireDir = require('require-dir');
const version = 'v1';

function registerRoutesFromRequireDir(app, routePath, obj) {
    if (typeof routePath !== 'string') return;
    if (typeof obj !== 'object' && typeof obj !== 'function') return;

    if (typeof obj === 'object') {
        if(Object.keys(obj).indexOf('index') >= 0){
            registerRoutesFromRequireDir(app, routePath, obj['index']);
            delete obj.index;
        }
        for (const item in obj) {
            if (obj[item] && item[0] !== '_') {
                let prefix = `${routePath}/${item}`;

                if(item.indexOf('@') >= 0) {
                    var _prefix = routePath.split("/").splice(-1)[0];
                    if (_prefix !== version)
                        prefix = `${routePath}/:id_${_prefix}/${item.replace('@', '')}`
                }

                registerRoutesFromRequireDir(app, prefix, obj[item]);
            }
        }

        return;
    }

    const router = express.Router({ mergeParams: true });

    obj(router);
    app.use(routePath, router);
}

module.exports = (app) => {
    const files = requireDir('./', { recurse: true });
    registerRoutesFromRequireDir(app, '/' + version, files);
};