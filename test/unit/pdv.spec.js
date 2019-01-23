"use strict";

const pdvFixture = {
    "id": "1",
    "tradingName": "Adega Osasco",
    "ownerName": "Ze da Ambev",
    "document": "02.453.716/000170",
    "coverageArea": {
        "type": "MultiPolygon",
        "coordinates": [[[[-43.36556, -22.99669], [-43.36539, -23.01928], [-43.26583, -23.01802], [-43.25724, -23.00649], [-43.23355, -23.00127], [-43.2381, -22.99716], [-43.23866, -22.99649], [-43.24063, -22.99756], [-43.24634, -22.99736], [-43.24677, -22.99606], [-43.24067, -22.99381], [-43.24886, -22.99121], [-43.25617, -22.99456], [-43.25625, -22.99203], [-43.25346, -22.99065], [-43.29599, -22.98283], [-43.3262, -22.96481], [-43.33427, -22.96402], [-43.33616, -22.96829], [-43.342, -22.98157], [-43.34817, -22.97967], [-43.35142, -22.98062], [-43.3573, -22.98084], [-43.36522, -22.98032], [-43.36696, -22.98422], [-43.36717, -22.98855], [-43.36636, -22.99351], [-43.36556, -22.99669]]]]
    },
    "address": {"type": "Point", "coordinates": [-43.297337, -23.013538]}
};


const dbMock = {
    collection: sinon.stub().returns({
        findOne: sinon.stub().returns(Promise.resolve({
            result: pdvFixture
        })),
        aggregate: sinon.stub().returns(Promise.resolve({
            result: [pdvFixture]
        }))
    })
};

const databaseMock = {
    connect: sinon.stub().returns(Promise.resolve(dbMock))
};

const PdvModel = require('../../model/pdv')(databaseMock);

describe("PDV Model", () => {
    it("Should get one when use correct id", done => {
        const req = {
            params: {
                id: "1"
            }
        };

        const res = {
            json: sinon.stub().returns(Promise.resolve({result: pdvFixture}))
        };

        PdvModel.getById(req, res).then(result => {
            expect(result).to.be.eql({result: pdvFixture});

            done();
        }).catch(done);
    });

    it("Should return err when id is not sent", done => {
        const req = {
            params: {}
        };

        const res = {
            json: sinon.stub().returns(Promise.resolve({result: pdvFixture}))
        };

        PdvModel.getById(req, res, (err) => {
            expect(err).to.be.eql(error.pdv.noId);

            done();
        });
    });


    it("Should return err when lat is not sent", done => {
        const req = {
            query: {}
        };

        const err = PdvModel.validateCoordinates(req);

        expect(err).to.be.eql(error.pdv.noLatitude);

        done();
    });

    it("Should return err when lng is not sent", done => {
        const req = {
            query: {
                lat: '3'
            }
        };

        const err = PdvModel.validateCoordinates(req);

        expect(err).to.be.eql(error.pdv.noLongitude);

        done();
    });

    it("Should return err when lat is not a number", done => {
        const req = {
            query: {
                lat: 'abc',
                lng: '4'
            }
        };

        const err = PdvModel.validateCoordinates(req);

        expect(err).to.be.eql(error.pdv.errLatitude);

        done();
    });

    it("Should return err when lng is not a number", done => {
        const req = {
            query: {
                lat: '1',
                lng: 'abc'
            }
        };

        const err = PdvModel.validateCoordinates(req);

        expect(err).to.be.eql(error.pdv.errLongitude);

        done();
    });

    it("Should return false when all parameters are correct", done => {
        const req = {
            query: {
                lat: '1',
                lng: '2'
            }
        };

        const err = PdvModel.validateCoordinates(req);

        expect(!!err).to.be.false;

        done();
    });

    it("Should return err when trading name is not sent", done => {
        const req = {
            body: {}
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noTradingName);

        done();
    });

    it("Should return err when owner name is not sent", done => {
        const req = {
            body: {
                tradingName: 'teste'
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noOwnerName);

        done();
    });

    it("Should return err when document is not sent", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste'
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noDocument);

        done();
    });

    it("Should return err when document is not valid", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '123456463'
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errDocument);

        done();
    });

    it("Should return err when coverage points are not sent", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07'
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noCoveragePoints);

        done();
    });

    it("Should return err when coverage points length is smaller then 3", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [1,3]]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errCoveragePointsLength);

        done();
    });

    it("Should return err when coverage points are not valid", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [1,3], [1]]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errCoveragePointsValidation);

        done();
    });

    it("Should return err when any coverage point is NaN", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [1,3], [1, 'a']]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errLatitude);

        done();
    });

    it("Should return err when coverage points shape is not a polygon", done => {
        const req = {
             body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [2,3], [3,2]]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noPolygon);

        done();
    });

    it("Should return err when address is not sent", done => {
        const req = {
             body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [2,3], [1,2]]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.noAddress);

        done();
    });

    it("Should return err when address is invalid", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [2,3], [1,2]],
                address: [1]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errAddressPoints);

        done();
    });

    it("Should return err when address is NaN", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [2,3], [1,2]],
                address: [1, 'a']
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(err).to.be.eql(error.pdv.errLatitude);

        done();
    });

    it("Should return false when all parameters are correct to Pdv", done => {
        const req = {
            body: {
                tradingName: 'teste',
                ownerName: 'teste',
                document: '65.702.180/0001-07',
                coveragePoints: [[1,2], [2,3], [1,2]],
                address: [1, 2]
            }
        };

        const err = PdvModel.validatePdv(req);

        expect(!!err).to.be.false;

        done();
    });
});