const express = require('express');
const ticketController = require('./../controller/ticketController');
const authController = require("../controller/authController");
const router = express.Router();


router
    .route('/top')
    .get(ticketController.aliasFilter, ticketController.allTickets);


router
    .route('/')
    .get(authController.ensureAuthenticated,ticketController.allTickets)
    .post(ticketController.createTicket);
router
    .route('/:id')
    .get(ticketController.getTicket)
    .patch(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);

module.exports = router;
