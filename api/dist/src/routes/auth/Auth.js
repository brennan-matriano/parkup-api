"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require('express');
const router = express.Router();
const path = '/auth';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpTransport = require('./../../mailer');
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const models_1 = require("../../../models");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
exports.loginPath = '/login';
router.post(exports.loginPath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    login(req, res);
}));
exports.signupPath = '/signup';
router.post(exports.signupPath, (req, res) => {
    const plaintext = req.body.password;
    req.body.password = encryptPassword(plaintext);
    models_1.db['User'].create(req.body)
        .then((user) => {
        updateAndMail(user, 'emailVerification', 'Parkup - Email Verification', process.env.FRONTEND_BASE_URL + process.env.VERIFY_PATH, false);
        res.json(true);
    })
        .catch((err) => res.json(err));
});
exports.emailVerificationPath = '/verify';
router.post(exports.emailVerificationPath, (req, res) => {
    validateUser(req, res);
});
exports.accountRecoveryRequestPath = '/recovery';
router.post(exports.accountRecoveryRequestPath, (req, res) => {
    recoverAccount(req, res);
});
exports.passwordResetPath = '/reset';
router.post(exports.passwordResetPath, (req, res) => {
    passwordReset(req, res);
});
exports.passwordChangePath = '/change';
router.post(exports.passwordChangePath, (req, res) => {
    passwordChange(req, res);
});
function passwordChange(req, res) {
    models_1.db['model'].findByPk(req.userId).then((user) => {
        user.update({ password: encryptPassword(req.body.newPassword) }).then(() => res.json(true));
    }).catch(() => res.json(false));
}
function passwordReset(req, res) {
    try {
        const secret = process.env.JWTSecret;
        const decoded = jwt.verify(req.body.token, new Buffer(secret, 'base64'));
        const deltas = {
            password: encryptPassword(req.body.newPassword),
            passwordResetToken: null,
        };
        const query = {
            where: {
                id: decoded.user,
                passwordResetToken: decoded.resetToken,
            },
        };
        models_1.db['User'].update(deltas, query).then(() => {
            res.json(true);
        });
    }
    catch (err) {
        res.json(err);
    }
}
function validateUser(req, res) {
    try {
        const secret = process.env.JWTSecret;
        const decoded = jwt.verify(req.body.token, new Buffer(secret, 'base64'));
        const deltas = {
            isVerified: true,
            passwordResetToken: null,
        };
        const query = {
            where: {
                id: decoded.user,
                passwordResetToken: decoded.resetToken,
            },
        };
        models_1.db['User'].update(deltas, query).then((out) => {
            if (out) {
                res.json(true);
            }
            else
                res.json(new Error('Error validating user'));
        });
    }
    catch (err) {
        res.json(err);
    }
}
function recoverAccount(req, res) {
    models_1.db['User'].findOne({ where: { email: req.body.email } })
        .then((out) => {
        let resetUrl = process.env.FRONTEND_BASE_URL + process.env.RESET_PATH;
        updateAndMail(out, 'forgotPasswordUser', 'Password Reset', resetUrl, true);
        res.json(true);
    })
        .catch((err) => res.json(new Error('Unable to reset password')));
}
function updateAndMail(user, template, subject, targetURL, expire) {
    const buffer = crypto_1.default.randomBytes(30).toString('hex');
    user.update({ passwordResetToken: buffer }).then(() => {
        const name = user.firstName;
        const claims = {
            user: user.id,
            resetToken: buffer
        };
        let secret = new Buffer(process.env.JWTSecret, 'base64');
        let jwtToSend = expire ? jwt.sign(claims, secret, { expiresIn: '1h' }) : jwt.sign(claims, secret);
        jwtToSend = (new Buffer(jwtToSend)).toString('base64');
        const emailContext = {
            url: targetURL + jwtToSend,
            name: name,
        };
        sendMail(user.email, template, subject, emailContext);
    });
}
function sendMail(email, template, subject, context) {
    const data = {
        to: email,
        from: process.env.MAILER_USER,
        template: template,
        subject: subject,
        context: context,
    };
    return smtpTransport.sendMail(data);
}
function encryptPassword(plaintext) {
    console.log(plaintext);
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(plaintext, salt);
    return (password);
}
function login(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user,
                });
            }
            req.login(user, { session: false }, (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.send(err);
                }
                let secret = new Buffer(process.env.JWTSecret, 'base64');
                const token = jwt.sign(user, secret, { expiresIn: '2h' });
                return res.json({ user, token });
            }));
        })(req, res);
    });
}
exports.default = { router, path };
