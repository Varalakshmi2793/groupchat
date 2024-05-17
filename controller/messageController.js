const Message = require('../model/message'); 
const User = require('../model/user'); 
const Group = require('../model/group'); 
const Chat = require('../model/Chat');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: [User, Group]
        });

        const messageData = messages.map(message => ({
            id: message.id,
            content: message.content,
            userId: message.userId,
            groupId: message.groupId,
            user: {
                id: message.User.id,
                username: message.User.username

            },
            group: {
                id: message.Group.id,
                name: message.Group.name
            }
        }));

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

// chatController.js


exports.createChat = async (req, res) => {
    try {
        const { userId } = req.body;
        // Create a new chat room or conversation in your database
        const newChat = await Chat.create({ participants: [userId] });
        res.json({ chatId: newChat._id });
    } catch (error) {
        console.error('Error creating new chat:', error);
        res.status(500).json({ error: 'Failed to create new chat' });
    }
};
