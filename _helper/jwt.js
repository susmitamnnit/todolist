const { expressjwt: expressJwt } = require('express-jwt');
const config = require('../config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',

        ]
    });
}

        

async function isRevoked(req, token) {
    const user = await userService.getById(token.payload.sub);
    //revoke token if user no longer exists
    if (!user) {
        return true;
    }
};
