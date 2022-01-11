const Subject = require('../models/subject');
const db = require('../database/database');
const subjectController = Subject(db.sequelize, db.Sequelize);

const newSubject = async (req, res) => {
    try {
        return res.render('./subjects/create');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createSubject = async (req, res) => {
    try {
        const subject = await subjectController.create(req.body);
        return res.redirect('/subjects');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await subjectController.findAll({});
        const object = {
            mapSubject: subjects.map(data => {
                return {
                    id: data.id,
                    description: data.description,
                    createdAt: data.createdAt,
                }
            })
        }
        return res.render('./subjects/list', {subjects: object.mapSubject});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await subjectController.findOne({
            where: { id: id },});
        let subjects = [];
        subjects.push(subject.dataValues);
        const object = {
            mapSubject: subjects.map(data => {
                return {
                    id: data.id,
                    description: data.description,
                    createdAt: data.createdAt,
                }
            })
        }
        if (subject) {
            return res.render('./subjects/show', {subject: object.mapSubject});
        }
        return res.status(404).send('Subject with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await subjectController.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedSubject = await subjectController.findOne({ where: { id: id } });
            let subjects = [];
            subjects.push(updatedSubject.dataValues);
            const object = {
                mapSubject: updatedSubject.map(data => {
                    return {
                        id: data.id,
                        description: data.description,
                        createdAt: data.createdAt,
                    }
                })
            }
            return res.render('./subjects/show', {subject: object.mapSubject});
        }
        throw new Error('Subject not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await subjectController.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.redirect('/');
        }
        throw new Error("Subject not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    newSubject,
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}