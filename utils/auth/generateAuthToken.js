const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateAuthToken = (jwtContent) => {
    return jwt.sign(
        jwtContent, 
        process.env.JWT_KEY, 
        { 
            expiresIn: "1d" 
        }
    );
};

module.exports = generateAuthToken;