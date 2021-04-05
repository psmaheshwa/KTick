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

exports.createdByMe = (req, res, next) => {
    req.query = {'createdBy' : req.user.id}
    next();
}

exports.assignedToMe = (req, res, next) => {
    req.query = {'assignedTo' : req.user.id}
    next();
}

exports.allTickets = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Ticket.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tickets = await features.query;


    // res.send(tickets);
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
    newTicket.createdBy = req.user.id;

    await Ticket.create(newTicket);

    res.status(201).json({
        status: 'Success',
        data: newTicket
    });

});

exports.getTicket = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id);
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

