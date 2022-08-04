const nodemailer = require('nodemailer');

const MAIL = 'willa.mayer@ethereal.email';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: MAIL,
        pass: 'MY7hSYXerQqMm6WGSG'
    }
});

module.exports = {transporter, MAIL};