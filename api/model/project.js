const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A Project must have a title.'],
        trim: true,
        maxlength: [20, 'A Project title must have less or equal then 20 characters'],
        minlength: [3, 'A Project title must have less or equal then 5 characters'],
        unique: [true, 'Project title should be Unique']
    },
    description: {
        type: String,
        required: [true, 'Desc must have minimum 10 words'],
        maxlength: [1000, 'A Project description must have less or equal then 1000 characters'],
        minlength: [10, 'A Project description must have less or equal then 10 characters']
    },

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
