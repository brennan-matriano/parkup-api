"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwtSettings = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: new Buffer(process.env.JWTSecret, 'base64'),
};
const localAuthFields = {
    usernameField: 'email',
    passwordField: 'password',
};
passport_1.default.use('local', new LocalStrategy(localAuthFields, (sentEmail, sentPassword, callback) => {
    return db['User'].findOne({ where: { email: sentEmail }, include: [db['Listing']] }).then((user) => {
        console.log(user);
        if (!user) {
            return callback(null, false, { message: 'Invalid login' });
        }
        else
            return validatePassword(sentPassword, user, callback);
    }).catch((error) => callback(error));
}));
passport_1.default.use('jwt', new passportJWT.Strategy(jwtSettings, (claims, callback) => {
    return db['User'].findByPk(claims.id)
        .then((user) => {
        return callback(null, user);
    })
        .catch((error) => {
        return callback(error);
    });
}));
function validatePassword(candidate, user, callback) {
    bcrypt.compare(candidate, user.password, function (err, res) {
        if (res) {
            console.log(user.Listings);
            if (user.Listings.length > 0) {
                return callback(null, { id: user.id, renter: true }, { message: 'Logged in' });
            }
            return callback(null, { id: user.id, renter: false }, { message: 'Logged in' });
        }
        return callback(null, false, { message: 'Incorrect email or password.' });
    });
}
