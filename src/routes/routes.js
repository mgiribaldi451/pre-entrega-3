// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------
const {fork} = require('child_process');
const logger = require('../utils/logger.js')
const {mail} = require('../services/sendMail')
const axios = require('axios')

function getRoot(req, res) {
    res.render('main')
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.render('login');
    }
}

function getSignup(req, res) {
    res.render('signup');
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        mail(req.body)
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

async function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        let resp = await axios.get('http://localhost:8080/productos')
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            console.log(error);
        })
        console.log(resp);

        res.render('profileUser', { user: user , resp , isUser:true })
    } else {
        res.redirect('login')
    }
}

async function getCart (req, res) {
    
        let resp = await axios.get('http://localhost:8080/carrito')
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            console.log(error);
        })
        
       let productos = resp.prod[0]
        console.log(productos);
        res.render('carrito', { productos  })
}


function getFaillogin (req, res) {
    logger.warn(`Hubo un problema al iniciar session`);
    res.render('login-error', {});
}

function getFailsignup (req, res) {
    logger.error(`usuario tuvo error al registrar cuenta`);
    res.render('signup-error', {});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            res.render('main');
        } 
    });
}




function failRoute(req, res){
    res.status(404).render('routing-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        logger.info(`Se logueo con exito en la Ruta: /login`)
        next();
    } else {
        res.redirect("/login");
    }
}



module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile,
    getCart
    
}
  