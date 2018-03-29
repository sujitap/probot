'use strict';

const mongoose = require('mongoose');
let schema = mongoose.Schema;

let dataSchema = new schema({
    name: String,
    size: String,
    type: String
});

module.exports = db.model('data', dataSchema);