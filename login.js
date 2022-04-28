const path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('./jwt');
const router = require('express').Router();

const db = require('./db');

//const fake_login_info = {username: 'username', password: 'password'};

router.get('/', (request, response) => {
    const token = request.cookies.access_token || null;
    if (token && jwt.verify_token(token)) response.redirect('/');
    else response.sendFile(path.join(__dirname, '/html/login.html'));
    return;
});

router.post('/', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const user = await db.User.findOne({ username: username });
    if (user != null && bcrypt.compareSync(password, user.password)) {
        const token = jwt.generate_token(username);
        response.cookie('access_token', token, { httpOnly: true });
        response.redirect('/');
    }
    else {
        response.sendFile(path.join(__dirname, '/html/login.html'));
    }
    return;
});

module.exports = router;
