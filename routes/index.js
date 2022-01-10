const { Router } = require('express');
const user = require('../controllers/UserController');

const router = Router();

router.get('/users', user.getAllUsers)
router.post('/users', user.createUser)

router.get('/users/:id', user.getUserById)

router.put('/users/:id', user.updateUser)
router.delete('/users/:id', user.deleteUser)

module.exports = router