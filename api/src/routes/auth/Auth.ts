const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const path = '/auth';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpTransport = require('./../../mailer');
import crypto from 'crypto';
import {db} from '../../../models'

const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const loginPath: string = '/login';
router.post(loginPath, async(req, res) => {
    login(req, res);
});

export const signupPath: string = '/signup'; 
router.post(signupPath, (req, res) => {
    const plaintext = req.body.password;
    req.body.password = encryptPassword(plaintext);
    db['User'].create(req.body)
        .then((user) => {
            updateAndMail(user, 'emailVerification',
                'Parkup - Email Verification', process.env.FRONTEND_BASE_URL + process.env.VERIFY_PATH, false);
            res.json(true);
        })
        .catch((err) => res.json(err));
});

export const emailVerificationPath: string = '/verify';
router.post(emailVerificationPath, (req, res) => {
    validateUser(req, res);
});


export const accountRecoveryRequestPath: string = '/recovery';
router.post(accountRecoveryRequestPath, (req, res) => {
    recoverAccount(req, res);
});

export const passwordResetPath: string = '/reset';
router.post(passwordResetPath, (req, res) => {
    passwordReset(req, res);
});

export const passwordChangePath: string = '/change';
router.post(passwordChangePath, (req,res)=>{
    passwordChange(req,res);
});


function passwordChange(req, res){
    db['model'].findByPk(req.userId).then((user)=>{
        user.update({password:encryptPassword(req.body.newPassword)}).then(()=>res.json(true))
    }).catch(()=>res.json(false));
}

/**
 * Resets password stored in the database given the user defined in the request
 * @param {Request} req - HTTP Request
 * @param {Response} res - HTTP Response
 */
function passwordReset(req, res) {
    try {
        // eslint-disable-next-line max-len
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
        db['User'].update(deltas, query).then(() => {
            res.json(true);
        });
    } catch (err) {
        res.json(err);
    }
}

/**
 * Checks if the given token is valid; if yes, verifies the user
 * @param {Request} req - HTTP Request
 * @param {Response} res - HTTP Response
 */
function validateUser(req, res) {
    try {
        // eslint-disable-next-line max-len
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
        db['User'].update(deltas, query).then((out) => {
            if (out) {
                res.json(true);
            } else res.json(new Error('Error validating user'));
        });
    } catch (err) {
        res.json(err);
    }
}

/**
 * Sends password reset email and logs reset request into the database
 * @param {object} model - Sequelize model
 * @param {Request} req - HTTP Request
 * @param {Response} res - HTTP Response
 */
function recoverAccount(req, res) {
    db['User'].findOne({ where: { email: req.body.email}})
        .then((out) => {
            let resetUrl = process.env.FRONTEND_BASE_URL + process.env.RESET_PATH; 
            updateAndMail(out, 'forgotPasswordUser',
                'Password Reset', resetUrl, true);
            res.json(true);
        })
        .catch((err) => res.json(new Error('Unable to reset password')));
}

/**
 * Updates the user's passwordResetToken field and sends email with
 * the arguments specified
 * @param {object} out - Sequelize Instance
 * @param {String} template - Specifies which template to use
 * @param {String} subject - Specifies the subject field of email to send
 * @param {String} targetURL - Specifies which url to send with the email
 */
function updateAndMail(user: any, template: string, subject: string, targetURL: string, expire: boolean) {
    const buffer = crypto.randomBytes(30).toString('hex');
    user.update({ passwordResetToken: buffer }).then(() => {
        const name = user.firstName;
        const claims = {
            user: user.id,
            resetToken: buffer
        };
        let secret = new Buffer(process.env.JWTSecret, 'base64');
        let jwtToSend = expire ? jwt.sign(claims, secret, { expiresIn: '1h' }) : jwt.sign(claims, secret);
        jwtToSend=(new Buffer(jwtToSend)).toString('base64');
        const emailContext = {
            url: targetURL + jwtToSend,
            name: name,
        };
        sendMail(user.email, template, subject, emailContext);
    });
}

/**
 * Composes email to send to the specified address witht the stated contents
 * @param {String} email - Receipient of the email being sent
 * @param {String} template - Specifies which template to use
 * @param {String} subject -  Specifies the subject field of email to send
 * @param {object} context - Content to fill out the template with
 * @return {Promise} - Returns the mail sending as a promise
 */
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

/**
 * Hashes the password of the user to allow it to be stored in the DB securely
 * @param {string} plaintext - Unhashed password
 * @return {password} - Hashed password
 */
function encryptPassword(plaintext) {
    console.log(plaintext)
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(plaintext, salt);
    return (password);
}

/**
 * Logs the user in and generates a JWT for the user
 * @param {Request} req - HTTP request sent to the server
 * @param {Response} res - HTTP response
 */
async function login(req, res) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            });
        }
        req.login(user, { session: false }, async(err) => {
            if (err) {
                res.send(err);
            }
            let secret = new Buffer(process.env.JWTSecret, 'base64');
            const token = jwt.sign(user, secret, { expiresIn: '2h' });
            return res.json({ user, token });
        });
    })(req, res);
}

export default {router, path};