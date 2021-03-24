const express = require('express');
const ticketController = require('./../controller/ticketController');

const router = express.Router();

router
    .route('/')
    .get(ticketController.allTickets)
    .post(ticketController.createTicket);
router
    .route('/:id')
    .get(ticketController.getTicket)
    .patch(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);

module.exports = router;
