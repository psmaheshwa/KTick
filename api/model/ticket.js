const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A Ticket must have a title.']
    },
    description: {
        type: String,
        required: [true, 'Desc must have minimum 50 words']
    },
    assignedTo: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        default: Date.now
    },
    createdOn: {
        type: Date,
        required: false
    },
    lastEditedOn: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
