const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema and model
const UserSchema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true }
}, { versionKey: '__userVersionKey' });

const User = mongoose.model('user', UserSchema);

module.exports = User;
