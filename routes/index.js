const { Router } = require('express');
const user = require('../controllers/UserController');
const subject = require('../controllers/SubjectController');
const topic = require('../controllers/TopicController');

const router = Router();

router.get('/users', user.getAllUsers)
router.post('/users', user.createUser)
router.get('/users/:id', user.getUserById)
router.put('/users/:id', user.updateUser)
router.delete('/users/:id', user.deleteUser)

router.get('/subjects', subject.getAllUsers)
router.post('/subjects', subject.createUser)
router.get('/subjects/:id', subject.getUserById)
router.put('/subjects/:id', subject.updateUser)
router.delete('/subjects/:id', subject.deleteUser)

router.get('/topics', topic.getAllUsers)
router.post('/topics', topic.createUser)
router.get('/topics/:id', topic.getUserById)
router.put('/topics/:id', topic.updateUser)
router.delete('/topics/:id', topic.deleteUser)

module.exports = router