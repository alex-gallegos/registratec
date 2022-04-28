const mongoose = require('mongoose');
mongoose.connect('mongodb://registratec-db:27017/registratec');

module.exports.User = mongoose.model(
    'User',
    {
        username: String,
        password: String,
        admin: Boolean,
        firstName: String,
        lastName:  String,
        email: String
    }
);

module.exports.Appointment = mongoose.model(
    'Appointment',
    {
        creator: mongoose.ObjectId,
        atendee: mongoose.ObjectId,
        time: Date

    }
);

module.exports.InadmissibleDate = mongoose.model(
    'InadmissibleDate',
    {
        admin: mongoose.ObjectId,
        time: Date
    }
);

module.exports.InadmissibleTime = mongoose.model(
    'InadmissibleTime',
    {
        admin: mongoose.ObjectId,
        time: Date
    }
);
