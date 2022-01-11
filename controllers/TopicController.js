const Topic = require('../models/topic');
const db = require('../database/database');
const topicController = Topic(db.sequelize, db.Sequelize);
const Subject = require('../models/subject');
const subjectController = Subject(db.sequelize, db.Sequelize);
const User = require('../models/subject');
const userController = User(db.sequelize, db.Sequelize);

const newTopic = async (req, res) => {
    try {
        const subjects = await subjectController.findAll();
        const object = {
            mapSubjects: subjects.map(data => {
                return {
                    id: data.id,
                    description: data.description,
                }
            })
        }
        return res.render('./topics/create', {subjects: object.mapSubjects});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createTopic = async (req, res) => {
    try {
        const topic = await topicController.create(req.body);
        return res.redirect('/topics');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllTopics = async (req, res) => {
    try {
        const topics = await topicController.findAll({});
        const object = {
            mapTopic: topics.map(data => {
                return {
                    id: data.id,
                    tittle: data.tittle,
                    content: data.content,
                    user: userController.findByPk(data.userId),
                    subject: subjectController.findByPk(data.subjectId),
                }
            })
        }
        return res.render('./topics/list', {topics: object.mapTopic});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getTopicById = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await topicController.findOne({
            where: { id: id },});
        let topics = [];
        topics.push(topic.dataValues);
        const object = {
            mapTopic: topics.map(data => {
                return {
                    id: data.id,
                    tittle: data.tittle,
                    content: data.content,
                    user: data.userId,
                    subject: data.subjectId,
                }
            })
        }
        if (topic) {
            return res.render('./topics/show', {topic: object.mapTopic});
        }
        return res.status(404).send('Topic with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await topicController.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedTopic = await topicController.findOne({ where: { id: id } });
            let topics = [];
            topics.push(updatedTopic.dataValues);
            const object = {
                mapTopic: updatedTopic.map(data => {
                    return {
                        id: data.id,
                        tittle: data.tittle,
                        content: data.content,
                        user: userController.findByPk(data.userId),
                        subject: subjectController.findByPk(data.subjectId),
                    }
                })
            }
            return res.render('./topics/show', {topic: object.mapTopic});
        }
        throw new Error('Topic not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await topicController.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.redirect('/');
        }
        throw new Error("Topic not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    newTopic,
    createTopic,
    getAllTopics,
    getTopicById,
    updateTopic,
    deleteTopic
}