"use strict";
const mongodb = require('mongodb');
const data = require('../scripts/data.json');

exports.up = function(db, next) {
    const pdv = db.collection('pdv');

    db.createIndex('pdv', {address: "2dsphere"}, () => {
        pdv.insertMany(data.pdvs).then((resultInsert) => {
                db.createCollection("counters").then((resultCounter) => {
                        const counters = db.collection('counters');

                        counters.insert({_id: 'pdv', sequence_value: ++resultInsert.result.n})
                            .then(
                                (result) => {
                                    next();
                                },
                                (err) => {
                                    next();
                                }
                            )
                    },
                    (err) => {
                        next();
                    });
            },
            (err) => {
                next();
            }
        );
    });
};

exports.down = function(db, next) {
    const pdv = db.collection('pdv');
    const counters = db.collection('counters');

    pdv.dropIndex("address_2dsphere", () => {
        counters.drop().then(result => {
            pdv.drop().then(result => {
                next();
            }, err => {
                next();
            });
        }, err => {
            next();
        });
    });
};
