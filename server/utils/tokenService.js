const jwt = require('jsonwebtoken');

// Generate token function
function generateAccessToken(user) {
    return jwt.sign({
            userId: user.id
        },
        process.env.TOKEN_SECRET, 
        {
            expiresIn: '1h'
        }
    );
}

function generateRefreshToken(user) {
    return jwt.sign({
            userId: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '30d'
        }
    );
}

module.exports = { generateAccessToken, generateRefreshToken }