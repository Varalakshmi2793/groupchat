const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./path/database');
const loginrouter = require('./router/login');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

const corsOptions = {
    origin: ['http://localhost:4000'], 
    methods: 'GET,POST'
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use(loginrouter);

sequelize.sync().then(() => {
    app.listen(4000);
}).catch(err => {
    console.error('Error syncing database:', err);
});