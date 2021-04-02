const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A Ticket must have a title.'],
        trim: true,
        maxlength: [40, 'A Ticket title must have less or equal then 40 characters'],
        minlength: [10, 'A Ticket title must have less or equal then 10 characters']
    },
    description: {
        type: String,
        required: [true, 'Desc must have minimum 50 words'],
        maxlength: [1000, 'A Ticket description must have less or equal then 1000 characters'],
        minlength: [10, 'A Ticket description must have less or equal then 10 characters']
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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
        type: Number,
        required: true,
        min: -1,
        max: 1
    },
    status: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    },
    projectID:{
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    dueDate: {
        type: Date,
        default:Date.now()+1
    }
},{
    toJSON: { virtuals : true},
    toObject : { virtuals : true}
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
