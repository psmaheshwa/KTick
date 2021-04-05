const express = require('express');
const ticketController = require('./../controller/ticketController');
const {ensureAuthenticated, restrictTo} = require("../controller/authController");
const router = express.Router();


router
    .route('/created')
    .get(ensureAuthenticated,ticketController.createdByMe, ticketController.allTickets);

router
    .route('/assigned')
    .get(ensureAuthenticated,ticketController.assignedToMe, ticketController.allTickets);


router
    .route('/created')
    .get(ensureAuthenticated,ticketController.createdByMe, ticketController.allTickets);

router
    .route('/assigned')
    .get(ensureAuthenticated,ticketController.assignedToMe, ticketController.allTickets);

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
