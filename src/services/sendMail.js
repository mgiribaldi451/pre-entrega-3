const {transporter} = require('../utils/mailer');
const mailOptions = require('../utils/mailOptions')

async function mail(datos){
    try{

        mailOptions.html=`<h1 style="color: blue;">Nombre:${datos.firstname}</h1><br><h1 style="color: blue;">Apellido ${datos.lastname}</h1><br><h1 style="color: blue;">Password ${datos.password}</h1><br>`
        const info = await transporter.sendMail(mailOptions)

    }catch(error){
        console.log(error);
    }
    
}

module.exports={mail}