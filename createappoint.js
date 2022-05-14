
const bcrypt = require('bcrypt');
const jwt = require('./jwt');
const router = require('express').Router();

const db = require('./db');

router.get('/', (request, response) => {
    const token = request.cookies.access_token || null;
    if (token && jwt.verify_token(token)) response.redirect('/');
    else response.sendFile(path.join(__dirname, '/html/createappoint.html'));
    return;
});

router.post('/', async (request, response) => {
    /*const password = request.body.password;
    const password_confirm = request.body.password_confirm;
    if ((password == '' || password_confirm == '') || password !== password_confirm) {
        console.log('Passwords empty or do not match!');
        response.sendFile(path.join(__dirname, '/html/signup.html'));
        return;
    }*/
    const username = request.body.username;
    if (username == '' || await db.User.findOne({ username: username }).exec() != null) {
        console.log('Username empty or exists!');
        response.sendFile(path.join(__dirname, '/html/signup.html'));
        return;
    }
    /*const email = request.body.email;
    if (email == '' || await db.User.findOne({ email: email }).exec() != null) {
        console.log('Email address empty or exists!');
        response.sendFile(path.join(__dirname, '/html/signup.html'));
        return;
    }*/
    const fecha = request.body.fecha;
    const first_name = request.body.firstname;
    const last_name = request.body.lastname;
    if (first_name == '' || last_name == '') {
        console.log('First or last name empty!');
        response.sendFile(path.join(__dirname, '/html/signup.html'));
        return;
    }
    //const password_hash = bcrypt.hashSync(password, 10);
    const new_appointment = new db.Appointment(
        {
            /*username: username,
            password: password_hash,
            admin: false,
            firstName: first_name,
            lastName: last_name,
            email: email*/
            creator:username,
            atendee:first_name,
            time:fecha,
        }
    )
    await new_appointment.save();
    console.log('Great Success');
    response.redirect('/login');
    return;
})

module.exports = router;
