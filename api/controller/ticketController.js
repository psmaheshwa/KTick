const Ticket = require('./../model/ticket');
const ApiFeatures = require('./../utils/apifeatures')
const catchAsync = require('./catchAsync')
const AppError = require('./../utils/AppError')

exports.aliasFilter = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-priority,status';
    req.query.field = 'title,description';
    next();
}

exports.totalOpened = catchAsync(async (req, res, next) => {
    req.query = {'status': 0, 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalClosed = catchAsync(async (req, res, next) => {
    req.query = {'status': 1, 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalHigh = catchAsync(async (req, res, next) => {
    req.query = {'priority': 1, 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalMedium = catchAsync(async (req, res, next) => {
    req.query = {'priority': 0, 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalLow = catchAsync(async (req, res, next) => {
    req.query = {'priority': -1, 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count});
});

exports.todayTickets = catchAsync(async (req, res, next) => {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    const count = await Ticket.countDocuments({'dueDate':{$gte: start,$lt: end}, 'status':0});
    res.status(200).json({count})
});

exports.dueExceeded = catchAsync(async (req, res, next) => {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    const count = await Ticket.countDocuments({'dueDate':{$lte: start}, 'status':0});
    res.status(200).json({count})
});

exports.createdByMe = (req, res, next) => {
    req.query = {'createdBy': req.user.id}
    next();
}

exports.assignedToMe = (req, res, next) => {
    req.query = {'assignedTo': req.user.id}
    next();
}

exports.allTickets = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Ticket.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tickets = await features.query;

    res.status(200).json({
        status: 'success',
        results: tickets.length,
        data: {
            tickets
        }
    });
});

exports.createTicket = catchAsync(async (req, res, next) => {
    let newTicket = req.body;
    newTicket.lastEditedOn = Date.now();
    // newTicket.createdBy = req.user.id;

    await Ticket.create(newTicket);

    res.status(201).json({
        status: 'Success',
        data: newTicket
    });

});

exports.getTicket = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id).populate(['createdBy','assignedTo','projectID']);
    if (!ticket) {
        return next(new AppError('Ticket not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: ticket
    })
});

exports.updateTicket = catchAsync(async (req, res, next) => {

    let updatedTicket = req.body;
    updatedTicket.lastEditedOn = Date.now();
    await Ticket.findByIdAndUpdate(req.params.id, updatedTicket, {
        new: true,
        runValidators: true
    });
    res.status(201).json({
        status: 'Updated',
        data: updatedTicket
    });

});

exports.deleteTicket = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
        return next(new AppError('Ticket not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
});

