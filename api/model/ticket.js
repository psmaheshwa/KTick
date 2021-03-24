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
    },
    createdOn: {
        type: Date,
        default: Date.now()
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
        default: 'open'
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
