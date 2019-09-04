"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const AuthRequired = passport.authenticate('jwt', { session: false });
const RefreshToken = (req, res, next) => {
    try {
        const jwtClaims = req.headers.authorization.split(' ')[1].split('.')[1];
        const jwt = JSON.parse(new Buffer(jwtClaims, 'base64').toString());
        req.body.currentUserId = jwt.id;
        const _1h = 3600;
        const timeToExpiry = (Math.round((jwt.iat + 7200) - (new Date()).getTime() / 1000));
        if (timeToExpiry <= _1h) {
            let secret = new Buffer(process.env.JWTSecret, 'base64');
            let newToken = jsonwebtoken.sign({
                id: jwt.id,
                isCompany: jwt.isCompany,
            }, secret, { expiresIn: '2h' });
            res.append('refreshToken', newToken);
            res.append('Access-Control-Expose-Headers', 'refreshToken');
        }
        next();
    }
    catch (e) {
        next();
    }
};
exports.default = {
    AuthRequired,
    RefreshToken
};
