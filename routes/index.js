const { Router } = require('express');
const user = require('../controllers/UserController');
const subject = require('../controllers/SubjectController');
const topic = require('../controllers/TopicController');
const passport = require('passport');

const router = Router();

const {authentication} = require('../helpers/authentication');

//routes for login
router.get("/", function (req, res) {
    res.render('login');
});
router.post("/", function (req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/",
        failureFlash:true
    })(req, res, next)
})
//routes for users
router.get('/users', authentication, user.getAllUsers)
router.post('/users', authentication, user.createUser)
router.get('/users/register', user.registerUser)
router.get('/users/show/:id', authentication, user.getUserById)
router.get('/users/edit/:id', authentication, user.updateUser)
router.get('/users/delete/:id', authentication, user.deleteUser)

//routes for subjects
router.get('/subjects', subject.getAllSubjects)
router.get('/subjects/create', authentication, subject.newSubject)
router.post('/subjects/create', authentication, subject.createSubject)
router.get('/subjects/show/:id', authentication, subject.getSubjectById)
router.get('/subjects/edit/:id', authentication, subject.updateSubject)
router.get('/subjects/delete/:id', authentication, subject.deleteSubject)

//routes for topics
router.get('/topics', topic.getAllTopics)
router.get('/topics/create', authentication, topic.newTopic)
router.post('/topics/create', authentication, topic.createTopic)
router.get('/topics/show/:id', authentication, topic.getTopicById)
router.get('/topics/edit/:id', authentication, topic.updateTopic)
router.get('/topics/delete/:id', authentication, topic.deleteTopic)

module.exports = router