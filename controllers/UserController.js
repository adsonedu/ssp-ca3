const User = require('../models/user');
const db = require('../database/database');
const userController = User(db.sequelize, db.Sequelize);

const createUser = async (req, res) => {
    try {
        const user = await userController.create(req.body);
        return res.redirect('/users');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userController.findAll();
        const object = {
            mapUser: users.map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                }
            })
        }
        return res.render('./users/list', {users: object.mapUser});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userController.findOne({
            where: { id: id },});
        let users = [];
        users.push(user.dataValues);
        const object = {
            mapUser: users.map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                }
            })
        }
        if (user) {
            return res.render('./users/show', {user: object.mapUser});
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await userController.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await userController.findOne({ where: { id: id } });
            let users = [];
            users.push(updatedUser.dataValues);
            const object = {
                mapUser: updatedUser.map(data => {
                    return {
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                    }
                })
            }
            return res.render('./users/show', {user: object.mapUser});
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await userController.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.redirect('/');
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const registerUser = async (req, res) => {
    try {
        return res.render('./register', {});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    registerUser,
}