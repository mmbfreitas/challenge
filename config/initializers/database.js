'use strict';

const MongoClient = require('mongodb').MongoClient;

class Database {
    constructor(config) {
        this.url = !config.db.user || !config.db.password ?
            `mongodb://${config.db.host}:${config.db.port}/${config.db.name}${config.db.options}` :
            `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}${config.db.options}`;
    }

    connect () {      
        return new Promise((resolve, reject) => {
            if (this.db) {
                return resolve(this.db);
            }

            MongoClient.connect(this.url, (err, conn) => {
                if (err) {
                    return reject(err);
                }

                this.db = conn;
                return resolve(this.db);
            });
        });
    }
}

module.exports = (config) => {
    return new Database(config);
};
