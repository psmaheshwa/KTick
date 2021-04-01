const Project = require('./../model/project');
const ApiFeatures = require('./../utils/apifeatures');
const catchAsync = require('./catchAsync');
const AppError = require('./../utils/AppError');

exports.allProjects = catchAsync(async (req, res, next) => {
    const projects = await Project.find();

    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    });
});

exports.getProject = catchAsync(async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return next(new AppError('Project not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: project
    })
});
exports.updateProject = catchAsync(async (req, res, next) => {

    let updatedProject = req.body;
    await Project.findByIdAndUpdate(req.params.id, updatedProject);
    res.status(201).json({
        status: 'Updated',
        data: updatedProject
    });

});

exports.deleteProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
        return next(new AppError('Project not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
});

exports.createProject = catchAsync(async (req, res, next) => {
    let newProject = req.body;
    await Project.create(newProject);

    res.status(201).json({
        status: 'Success',
        data: newProject
    });

});
