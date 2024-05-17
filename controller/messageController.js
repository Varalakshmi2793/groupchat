const Message = require('../model/message'); 
const User = require('../model/user'); 
const Group = require('../model/group'); 
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: [User, Group]
        });

        // Extracting message data
        const messageData = messages.map(message => ({
            id: message.id,
            content: message.content,
            userId: message.userId,
            groupId: message.groupId,
            user: {
                id: message.User.id,
                username: message.User.username
                // Add other user properties if needed
            },
            group: {
                id: message.Group.id,
                name: message.Group.name
                // Add other group properties if needed
            }
        }));

        // Sending the message data as JSON
        res.status(200).json({
            messages: messageData
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.postMessage = async (req, res) => {
    const { content, groupId } = req.body;

    try {
        const message = await Message.create({
            content,
            userId: req.user.id,
            GroupId: groupId
        });
        const result = await Message.findByPk(message.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Group, attributes: ['name'] }
            ]
        });

        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};