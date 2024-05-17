const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, phonenumber, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(403).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, phoneNumber: phonenumber, password: hashedPassword }); // Corrected property name
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }
        const token = jwt.sign({ userId: user.id, username:user.username }, 'secretkey');
        user.lastLogin = new Date();
        await user.save();
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};
exports.searchUsers = async (req, res) =&gt; {
    try {
        const { username } = req.query;
        const users = await User.find({ username: { $regex: username, $options: 'i' } });
        res.json({ users });
    } catch (error) {
        console.error('Error searching for users:', error);
        res.status(500).json({ error: 'Failed to search for users' });
    }
};