const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./path/database');
const User = require('./model/user');
const Message = require('./model/message');
const Group = require('./model/group');
const UserGroups = require('./model/usergroup');
const router = require('./router');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:4000', 
    methods: 'GET,POST'
};

app.use(cors(corsOptions));

// Place API routes before static file serving
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

User.belongsToMany(Group, { through: UserGroups });
Group.belongsToMany(User, { through: UserGroups });
Message.belongsTo(User);
Message.belongsTo(Group);
Group.hasMany(Message);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
