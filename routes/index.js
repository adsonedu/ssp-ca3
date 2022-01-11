const { Router } = require('express');
const user = require('../controllers/UserController');
const subject = require('../controllers/SubjectController');
const topic = require('../controllers/TopicController');
const passport = require('passport');

const router = Router();

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
router.get('/users', user.getAllUsers)
router.post('/users', user.createUser)
router.get('/users/register', user.registerUser)
router.get('/users/show/:id', user.getUserById)
router.get('/users/edit/:id', user.updateUser)
router.get('/users/delete/:id', user.deleteUser)

//routes for subjects
router.get('/subjects', subject.getAllSubjects)
router.get('/subjects/create', subject.newSubject)
router.post('/subjects/create', subject.createSubject)
router.get('/subjects/show/:id', subject.getSubjectById)
router.get('/subjects/edit/:id', subject.updateSubject)
router.get('/subjects/delete/:id', subject.deleteSubject)

//routes for topics
router.get('/topics', topic.getAllTopics)
router.get('/topics/create', topic.newTopic)
router.post('/topics/create', topic.createTopic)
router.get('/topics/show/:id', topic.getTopicById)
router.get('/topics/edit/:id', topic.updateTopic)
router.get('/topics/delete/:id', topic.deleteTopic)

module.exports = router