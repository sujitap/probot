'use strict';

const mongoose = require('mongoose');
let schema = mongoose.Schema;

let dataSchema = new schema({
    name: string,
    size: string,
    type: string
});

module.exports = db.model('data', dataSchema);