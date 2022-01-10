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

// config controllers
const UserController = require("./controllers/UserController");
const BookController = require("./controllers/BookController");

//config routes
app.get("/", function (req, res) {
    res.render('login');
});
app.get("/register", function (req, res) {
    res.render('register', {user: [{}]});
});
app.post("/register", function (req, res) {
    new UserController().create(req, res);
});
app.get("/home", function (req, res) {
    res.render('home');
});


//users
app.get("/users", function (req, res) {
    new UserController().show(req, res);
});
app.get("/users/delete/:id", function (req, res) {
    console.log(req.params.id);
    new UserController().delete(req, res);
})
app.get("/users/show/:id", function (req, res) {
    new UserController().show(req, res);
})
app.get("/users/edit/:id", function (req, res) {
    new UserController().edit(req, res);
});
app.post("/users/edit", function (req, res) {
    new UserController().update(req, res);
});


//books
app.get("/books", function (req, res) {
    new BookController().show(req, res);
});
app.get("/books/create", function (req, res) {
    res.render('./book/create', {book: [{}]});
});
app.post("/books/create", function (req, res) {
    new BookController().create(req, res);
});
app.get("/books/delete/:id", function (req, res) {
    new BookController().delete(req, res);
})
app.get("/books/show/:id", function (req, res) {
    new BookController().show(req, res);
})
app.get("/books/edit/:id", function (req, res) {
    new BookController().edit(req, res);
});
app.post("/books/edit", function (req, res) {
    new BookController().update(req, res);
});

//start app in a local port
app.listen(8081);
