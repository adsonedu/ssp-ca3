//config app with express
const express = require("express");
const app = express();

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
app.use('/api', routes);

//config logging
const logger = require('morgan');
app.use(logger('dev'))

app.listen(8081);
