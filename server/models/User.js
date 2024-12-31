const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
},{collection: 'user'});

const User = mongoose.model('User', userSchema);

module.exports = User;