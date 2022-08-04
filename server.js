const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./src/routes/routes')
const routesProd = require('./src/routes/productos')
const routesCart = require('./src/routes/carrito')
const UserModel = require('./src/models/usuarios');
//const compression = require('compression')
const { validatePass } = require('./src/utils/passValidator');
const { createHash } = require('./src/utils/hashGenerator')
const logger = require('./src/utils/logger')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { TIEMPO_EXPIRACION } = require('./src/config/config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length;
const yargs = require('yargs/yargs')(process.argv.slice(2));
const params = yargs.argv
const mongoose = require('mongoose');
const {MONGO_URI} = require('./src/config/config')
//console.log(port);
//const yargs = require('yargs/yargs')([ '-p', '8080' ]).argv
// const TIEMPO_EXPIRACION = 600000
const app = express()

app.use(session({
    secret: 'coderhouse',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials/",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.static(__dirname + "/public"));


const conn = mongoose.createConnection(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => logger.info('DB users conectada'))

  const modelo = conn.model(UserModel.usuariosCollection,UserModel.UsuarioSchema)

passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        modelo.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                logger.warn('Invalid user')
                return callback(null, false)
            }

            if (!validatePass(user, password)) {
                logger.warn('Invalid Password');
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))


passport.use('signup', new LocalStrategy(
    { passReqToCallback: true }, async (req, username, password, callback) => {
        await modelo.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            console.log(req.body);

            const newUser = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                address: req.body.address,
                phone: req.body.phone,
                //email: req.body.email,
                username: username,
                password: createHash(password)
            }

            console.log(newUser);


            modelo.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }

                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
))


passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    modelo.findById(id, callback)
})



app.get('/productos', routesProd.getAllProds);
//app.get('/productos/:id', routesProd.getAllProds);
app.post('/productos', routesProd.addProd);
app.get('/carrito', routesCart.getCart);


//  INDEX
app.get('/', routes.getRoot);


//  LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//  SIGNUP
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//  LOGOUT
app.get('/logout', routes.getLogout);



// PROFILE
app.get('/profile', routes.getProfile);

app.get('/ruta-protegida', routes.checkAuthentication, (req, res) => {
    res.render('protected')
});

//  FAIL ROUTE
app.get('*', routes.failRoute);





const server = app.listen(params.p, () => {
    logger.info(`Server on port ${params.p}`);

    server.on('error', error => logger.error(`Error en el servidor ${error}`))
})
