const path = require('path');

const router = require('express').Router();

const jwt = require('./jwt');

const fake_login_info = {username: 'username', password: 'password'};

router.get('/', (request, response) => {
    const token = request.cookies.access_token || null;
    if (token && jwt.verify_token(token)) response.redirect('/');
    else response.sendFile(path.join(__dirname, '/html/login.html'));
});

router.post('/',(request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    if (username == fake_login_info.username && password == fake_login_info.password) {
        const token = jwt.generate_token(username);
        response.cookie('access_token', token, { httpOnly: true });
        response.redirect('/');
    }
    else {
        response.sendFile(path.join(__dirname, '/html/login.html'));
    }
});

module.exports = router;
