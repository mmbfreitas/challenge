const database = require('../config/initializers/database')(config);

class ModelFactory {
    constructor(call) {
        return this[`_${call}`]();
    }

    _pdv() {
        return require("../model/pdv")(database);
    }
}

module.exports = ModelFactory;