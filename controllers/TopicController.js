const Topic = require('../models/topic');
const db = require('../database/database');
const topicController = Topic(db.sequelize, db.Sequelize);
const subjectController = require('../controllers/SubjectController');
const userController = require('../controllers/UserController');

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
                    user: userController.getUserById(data.userId),
                    subject: subjectController.getSubjectById(data.subjectId),
                }
            })
        }
        return res.render('./topics/list', {topic: object.mapTopic});
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
            mapTopic: topic.map(data => {
                return {
                    id: data.id,
                    tittle: data.tittle,
                    content: data.content,
                    user: userController.getUserById(data.userId),
                    subject: subjectController.getSubjectById(data.subjectId),
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
                        user: userController.getUserById(data.userId),
                        subject: subjectController.getSubjectById(data.subjectId),
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
    createTopic,
    getAllTopics,
    getTopicById,
    updateTopic,
    deleteTopic
}