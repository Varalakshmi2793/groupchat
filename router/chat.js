const express = require('express');
const router = express.Router();
const ChatMessage = require('../controller/chatmessage');

router.post('/message', ChatMessage.chatmessage);
router.get('/messages', ChatMessage.displaymessage);

module.exports = router;
