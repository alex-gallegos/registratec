const path = require('path');

const cookie_parser = require('cookie-parser');
const express = require('express');

const jwt = require('./jwt');

const app = express();
const port = process.env.PORT || 8000;

app.use(cookie_parser());
app.use(express.json());
app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    const token = request.cookies.access_token || null;
    if (token && jwt.verify_token(token)) {
        console.log('Found valid token! (from login page)');
        response.sendFile(path.join(__dirname, '/html/main.html'));
    }
    else {
        console.log('No valid token (from login page)');
        response.redirect('/login');
    }
});

app.use('/calendar', require('./calendar'));
app.use('/login', require('./login'));
app.use('/signup', require('./signup'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
