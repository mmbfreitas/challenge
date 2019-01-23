"use strict";

const { pdvFixture } = require('../data/pdv-fixture');

describe('PDV functional tests', () => {
    it('should get pdv by id', done => {
        request
            .get(`/${versionApi}/pdv/1`)
            .expect(200)
            .end((err, res) => {
                const pdv = res.body.result;

                expect(err).to.be.null;
                expect(pdv).to.have.property('_id');
                expect(pdv).to.have.property('id');
                expect(pdv.id).to.be.eql('1');

                done();
            });
    });

    it('should return empty with not find', done => {
        request
            .get(`/${versionApi}/pdv/999999999999`)
            .expect(200)
            .end((err, res) => {
                const pdv = res.body.result;

                expect(err).to.be.null;
                expect(pdv).to.be.null;

                done();
            });
    });


    it('should return nearest place', done => {
        request
            .get(`/${versionApi}/pdv?lng=-38.542136&lat=-3.797545`)
            .expect(200)
            .end((err, res) => {
                const pdv = res.body.result;

                expect(pdv).to.have.property('_id');
                expect(pdv).to.have.property('id');
                expect(pdv.id).to.be.eql('4');

                done();
            });
    });

    it('should return error when don\'t find any pdv', done => {
        request
            .get(`/${versionApi}/pdv?lng=2.542136&lat=3.797545`)
            .expect(404)
            .end((err, res) => {

                expect(res.body.error).not.to.be.null;
                expect(res.body.error).to.have.property('code');
                expect(res.body.error.code).to.be.eql('PDV-00006');

                done();
            });
    });

    it('should add new pdv', done => {
        request
            .post(`/${versionApi}/pdv`)
            .send(pdvFixture)
            .expect(200)
            .end((err, res) => {
                const pdv = res.body.result;

                expect(pdv).to.have.property('_id');
                expect(pdv).to.have.property('id');

                done();
            });
    });
});
