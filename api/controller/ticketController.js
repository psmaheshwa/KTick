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
    req.query = {'status': 'Open', 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalClosed = catchAsync(async (req, res, next) => {
    req.query = {'status': 'Close', 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalHigh = catchAsync(async (req, res, next) => {
    req.query = {'priority': 'High', 'status': 'Open', 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalMedium = catchAsync(async (req, res, next) => {
    req.query = {'priority': 'Medium', 'status': 'Open', 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count})
});

exports.totalLow = catchAsync(async (req, res, next) => {
    req.query = {'priority': 'Low', 'status': 'Open', 'assignedTo': req.user.id};
    const count = await Ticket.countDocuments(req.query);
    res.status(200).json({count});
});

exports.todayTickets = catchAsync(async (req, res, next) => {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    const count = await Ticket.countDocuments({'dueDate':{$gte: start,$lt: end}, 'status':'Open','assignedTo': req.user.id});
    res.status(200).json({count})
});

exports.dueExceeded = catchAsync(async (req, res, next) => {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    const count = await Ticket.countDocuments({'dueDate':{$lte: start}, 'status':'Open', 'assignedTo': req.user.id});
    res.status(200).json({count})
});


exports.totalAssigned = catchAsync(async (req,res,next) =>{
    const count = await Ticket.countDocuments({'assignedTo': req.user.id});
    res.status(200).json({count})
})

exports.createdByMe = (req, res, next) => {
    req.query = {'createdBy': req.user.id}
    next();
}

exports.assignedToMe = (req, res, next) => {
    req.query = {'assignedTo': req.user.id}
    next();
}

exports.allTickets = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Ticket.find().populate(['createdBy','assignedTo','projectID']), req.query)
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

exports.assigned = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Ticket.find({'assignedTo':req.user.id}).populate(['createdBy','assignedTo','projectID']), req.query)
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

exports.created = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Ticket.find({'createdBy':req.user.id}).populate(['createdBy','assignedTo','projectID']), req.query)
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
    console.log(req.body)
    let newTicket = req.body;
    newTicket.lastEditedOn = Date.now();
    newTicket.createdBy = req.user.id;
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
    updatedTicket.createdBy = req.user.id;
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
exports.weeklyData = catchAsync(async (req, res, next) => {
    let days = [];

    for (let i = 0; i < 7; i++) {
        var start = new Date();
        start.setDate(start.getDate() - i);
        start.setHours(0, 0, 0, 0);
        var end = new Date();
        end.setDate(end.getDate() - i);
        end.setHours(23, 59, 59, 999);
        const Open = await Ticket.countDocuments({
            'createdOn': {$gte: start, $lt: end},
            'status': 'Open',
            'assignedTo': req.user.id
        });

        const Close = await Ticket.countDocuments({
            'createdOn': {$gte: start, $lt: end},
            'status': 'Close',
            'assignedTo': req.user.id
        });
        const total = await Ticket.countDocuments({
            'createdOn': {$gte: start, $lt: end},
            'assignedTo': req.user.id
        });
        days.push({Open, Close, total})
    }
    res.status(200).json({
        days
    });
});
