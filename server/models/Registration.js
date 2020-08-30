const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
});

const Registration = mongoose.model('Registration', RegistrationSchema)

module.exports = Registration;