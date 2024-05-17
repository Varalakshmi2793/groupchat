const User = require('../model/user');
const Group = require('../model/group');
const UserGroup = require('../model/usergroup');

exports.getUsersAndGroups = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username'] });
        const groups = await Group.findAll({ attributes: ['id', 'name'] });

        res.json({ users, groups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const group = await Group.create({ name });

        res.json({ group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addUserToGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.body;

        const userGroup = await UserGroup.create({ GroupId: groupId, UserId: userId });

        res.json({ userGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
