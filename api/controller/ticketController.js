const Ticket = require('./../model/ticket');

exports.allTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.status(200).json({
            status: 'Success',
            data: tickets
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTicket = async (req, res) => {
    try {
        let newTicket = req.body;
        newTicket.lastEditedOn = Date.now();
        await Ticket.create(newTicket);

        res.status(201).json({
            status: 'Success',
            data: newTicket
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: ticket
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTicket = async (req, res) => {
    try {
        let updatedTicket = req.body;
        updatedTicket.lastEditedOn = Date.now();
        await Ticket.findByIdAndUpdate(req.params.id, updatedTicket);
        res.status(201).json({
            status: 'Updated',
            data: updatedTicket
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        const deleteTicket = await Ticket.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'Deleted',
            data: deleteTicket
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

