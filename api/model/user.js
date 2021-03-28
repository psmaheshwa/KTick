const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    uniqueId: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: {
        type: String
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;


