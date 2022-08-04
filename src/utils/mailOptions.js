const transporter = require('./mailer')


const email = transporter.MAIL

const mailOptions = {
    from: 'Servidor Node.js',
    to: email,
    subject: 'Nuevo Regsitro',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
 }

 module.exports = mailOptions
 