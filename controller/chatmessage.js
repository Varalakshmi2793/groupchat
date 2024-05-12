const Message = require('../model/chatmessage');

exports.chatmessage = async (req, res) => {
    try {
        const { sender, content } = req.body;
        const message = await Message.create({ sender, content });
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.displaymessage = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};