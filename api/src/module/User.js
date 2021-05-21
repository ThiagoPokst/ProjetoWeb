const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: String,
    pass: String,
    bio: String,
    ocup: String
});

module.exports = mongoose.model('User', UserSchema);