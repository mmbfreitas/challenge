"use strict";

const dbconfig = require('../../config/config');
const database = require('../../config/initializers/database')(dbconfig);


describe('DB connectivity test', () => {
    it('Database should connect', (done) => {
        database.connect().then(db => {
            expect(db).not.to.be.null;
            done();
        });
    });
});
