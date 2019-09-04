let nodemailer = require('nodemailer');
let hbs = require('nodemailer-express-handlebars');
require('dotenv').config();
const path = require('path');
let smtpTransport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT),
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});
const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
};
smtpTransport.use('compile', hbs(handlebarsOptions));
module.exports = smtpTransport;
