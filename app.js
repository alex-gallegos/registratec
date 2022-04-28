const cookie_parser = require('cookie-parser');
const express = require('express');
const app = express()
const port = process.env.PORT || 8000;

app.use(cookie_parser());
app.use(express.json());
app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    //console.log(request.cookies);
    response.send('Hello world!');
});

app.use('/login', require('./login'));
app.use('/signup', require('./signup'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
