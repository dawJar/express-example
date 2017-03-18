const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema and model
const PersonSchema = new Schema({
    name: String,
    age: Number,
    invited: Boolean
}, { versionKey: '__ownVersionKey' });

const Person = mongoose.model('person', PersonSchema);

module.exports = Person;
