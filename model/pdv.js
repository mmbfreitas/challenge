'use strict';

const objectID = require('mongodb').ObjectID;

class PdvModel {

    constructor(database) {
        this.database = database;
        this.collection = "pdv";
    }

    validateCoordinates(req) {

        if (!req.query.lat) {
            return error.pdv.noLatitude;
        }
        if (!req.query.lng) {
            return error.pdv.noLongitude;
        }
        if (isNaN(req.query.lat)) {
            return error.pdv.errLatitude;
        }
        if (isNaN(req.query.lng)) {
            return error.pdv.errLongitude;
        }

        return;
    }

    getByCoordinates(req, res, next) {
        const isInvalidCoordinates = this.validateCoordinates(req);

        if (isInvalidCoordinates) {
            return next(isInvalidCoordinates);
        }

        this.database.connect().then((db) => {
            const coordinates = [Number(req.query.lng), Number(req.query.lat)];
            db.collection(this.collection)
                .aggregate([
                    {
                        $geoNear: {
                            near: {type: "Point", coordinates: coordinates},
                            distanceField: "dist.calculated",
                            query: {
                                "coverageArea": {
                                    "$geoIntersects": {
                                        "$geometry": {
                                            "type": "Point",
                                            "coordinates": coordinates
                                        }
                                    }
                                }
                            },
                            includeLocs: "dist.address",
                            spherical: true
                        }
                    }
                ]).toArray((err, pdvs) => {
                if (err) {
                    return next(err);
                }
                if (!pdvs || !pdvs.length) {
                    return next(error.pdv.noPdvAvailable);
                }

                return res.json({result: pdvs[0]})
            });
        });
    }

    getById(req, res, next) {
        if (!req.params.id) {
            return next(error.pdv.noId);
        }

        return this.database.connect().then((db) => {
            return db.collection(this.collection)
                .findOne({id: req.params.id})
                .then(
                    (pdv) => {
                        return res.json({result: pdv})
                    },
                    (err) => {
                        next(err)
                    }
                );
        });
    }

    validatePdv(req) {
        if (!req.body.tradingName) {
            return error.pdv.noTradingName;
        }
        if (!req.body.ownerName) {
            return error.pdv.noOwnerName;
        }
        if (!req.body.document) {
            return error.pdv.noDocument;
        }
        if (!helper.isValidCnpj(req.body.document)) {
            return error.pdv.errDocument;
        }
        if (!req.body.coveragePoints || !req.body.coveragePoints.length) {
            return error.pdv.noCoveragePoints;
        }
        if (req.body.coveragePoints.length < 3) {
            return error.pdv.errCoveragePointsLength;
        }
        else {
            let pointErr;
            req.body.coveragePoints.forEach((point) => {
                if (!point.length || point.length != 2) {
                    pointErr = error.pdv.errCoveragePointsValidation;
                }

                if(!pointErr) {
                    pointErr = this.validateCoordinates({
                        query: {
                            lng: point[0],
                            lat: point[1]
                        }
                    });
                }
            });

            if (pointErr) {
                return pointErr
            }
        }
        if (JSON.stringify(req.body.coveragePoints[0]) !== JSON.stringify(req.body.coveragePoints[req.body.coveragePoints.length - 1])) {
            return error.pdv.noPolygon;
        }
        if (!req.body.address || !req.body.address.length) {
            return error.pdv.noAddress;
        }
        if (req.body.address.length != 2) {
            return error.pdv.errAddressPoints;
        }

        return this.validateCoordinates({
            query: {
                lng: req.body.address[0],
                lat: req.body.address[1]
            }
        });
    }

    async insert(req, res, next) {
        const isInvalidPdv = this.validatePdv(req);

        if (isInvalidPdv) {
            return next(isInvalidPdv);
        }

        const id = await this.getNextSequenceValue(this.collection);

        const data = {
            "id": id.toString(),
            "tradingName": req.body.tradingName,
            "ownerName": req.body.ownerName,
            "document": req.body.ownerName,
            "coverageArea": {
                "type": "MultiPolygon",
                "coordinates": [[req.body.coveragePoints]]
            },
            "address": {
                "type": "Point",
                "coordinates": req.body.address
            }
        };

        return this.database.connect().then((db) => {
            return db.collection(this.collection)
                .insertOne(data)
                .then(
                    (result) => {
                        return res.json({result: result.ops[0]});
                    },
                    (err) => {
                        next(err);
                    }
                );
        });
    }

    async getNextSequenceValue(sequenceName) {
        const db = await this.database.connect();
        const sequence = await db.collection("counters").findOneAndUpdate(
            {_id: sequenceName},
            {$inc: {"sequence_value": 1}},
            {returnNewDocument: true}
        );

        return sequence.value.sequence_value;
    }
}

module.exports = (database) => {
    return new PdvModel(database);
};
