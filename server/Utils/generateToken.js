const crypto = require('crypto');

function generateRandomToken(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = generateRandomToken;
