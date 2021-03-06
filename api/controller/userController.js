const User = require('./../model/user');
const ApiFeatures = require('./../utils/apifeatures');
const catchAsync = require('./catchAsync');
const AppError = require('./../utils/AppError');


exports.allUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const users = await features.query;
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        }
    });
});


exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    })
});

exports.updateUser = catchAsync(async (req, res, next) => {

    let updatedUser = req.body;
    await User.findByIdAndUpdate(req.params.id, updatedUser);
    res.status(201).json({
        status: 'Updated',
        data: updatedUser
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
});

exports.createUser = catchAsync(async (req, res, next) => {
    let user = await User.findOne({'uniqueId': req.body.uniqueId});
    if (!user) {
        new User({
            uniqueId: req.body.uniqueId,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }).save().then((newUser) => {
            res.status(201).json({
                status: 'Success',
                data: {
                    newUser
                }
            });
        });
    } else {
        res.status(201).json({
            status: 'Success',
            data: {
                user
            }
        });
    }

});

