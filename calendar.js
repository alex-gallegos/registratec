const path = require('path');

const jwt = require('./jwt');
const router = require('express').Router();

const db = require('./db');

const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const readable_hours = hours.map((value) => ((value + 11) % 12 + 1) + ':00 ' + (value >= 12 ? 'P.M.' : 'A.M.'));

//(((value + 11) % 12) + 1) + (value >= 12 ? 'P.M.' : 'A.M.')

router.use('/calendar', jwt.check_login_middleware);

router.get('/', (request, response) => {
    const week_offset = parseInt(request.query.adv) * 7 || 0;
    const today = new Date(new Date().toDateString());
    const this_monday = new Date(today);
    this_monday.setDate((today.getDate() - today.getDay()) + 1);
    const required_monday = new Date(this_monday);
    required_monday.setDate(this_monday.getDate() + week_offset);
    //console.log(this_monday);
    //console.log(required_monday);
    const days = [...Array(5).keys()].map(x => {
        let day = new Date(required_monday);
        day.setDate(required_monday.getDate() + x);
        return day;
    });
    console.log(days);
    //response.redirect('/');
    response.render('calendar', {
        layout: false,
        hours: hours.map((value, index) => {
            return {
                value: value,
                readable: readable_hours[index],
                rowIndex: index + 2
            }
        }),
        days: days.map((value, index) => {
            return {
                value: value,
                readable: value.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                colIndex: index + 2
            }
        })
    });
});

module.exports = router;
