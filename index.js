//config app with express
const express = require("express");
const app = express();

//config passport authentication
const passport = require('passport');
require("./config/auth")(passport)

//config session
const session = require('express-session')
app.use(session({
    secret: "sspca3",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//config flash messages
const flash = require("flash");
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

//config template engine
const handlebars = require('express-handlebars');
const path = require ('path');
app.use(express.static(path.join(__dirname + 'views')));
var hbs = handlebars.create({
    helpers: {
    },
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//config body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/', routes);

//config logging
const logger = require('morgan');
app.use(logger('dev'))

app.listen(8083);
