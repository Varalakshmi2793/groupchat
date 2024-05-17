const express = require('express');
const router = express.Router();
const { authenticate } = require('./middleware/auth');
const authController = require('./controller/authController');
const messageController = require('./controller/messageController');

const { getUsersAndGroups, createGroup, addUserToGroup } = require('./controller/userGroupController');


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/api/messages', authenticate, messageController.getMessages);

router.post('/api/messages', authenticate, messageController.postMessage);



router.get('/api/users-and-groups', authenticate, getUsersAndGroups);
router.post('/groups', authenticate, createGroup);
router.post('/groups/:groupId/users', authenticate, addUserToGroup);

module.exports = router;


module.exports = router;
