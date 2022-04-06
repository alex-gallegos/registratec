const express = require('express');
const app = express()
const port = process.env.PORT || 8000;

app.get('/', (request, response) => {
    response.send('Hello world!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
