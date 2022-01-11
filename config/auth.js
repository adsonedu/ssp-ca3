const strategy = require("passport-local");
const bcrypt = require("bcryptjs");
const db = require('../database/database');

const userModel = require("../models/user");
const User = require("../models/user");

const user = User(db.sequelize, db.Sequelize);

module.exports = function (passport) {
    passport.use(new strategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        user.findOne({where: {email: email}}).then((findUser) => {
            if (!findUser) {
                return done(null, false, {message: "The email doesnt exists!"});
            }

            bcrypt.compare(password, findUser.password, (error, match) => {
                if (match) {
                    return done(null, findUser)
                } else {
                    return done(null, false, {message: "Error: could not authenticate!"})
                }
            });
        })
    }));

    passport.serializeUser((findUser, done) => {
        done(null, findUser.id);
    });

    passport.deserializeUser((id, done) => {
        const findUser = user.findOne({where: { id: id }});
        done(null, findUser);
    })
}