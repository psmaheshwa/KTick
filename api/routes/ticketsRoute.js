const express = require('express');
const ticketController = require('./../controller/ticketController');
const {ensureAuthenticated, restrictTo} = require("../controller/authController");
const router = express.Router();


router
    .route('/top')
    .get(ticketController.aliasFilter, ticketController.allTickets);


router
    .route('/')
    .get(ensureAuthenticated, restrictTo('admin', 'user'), ticketController.allTickets)
    .post(ensureAuthenticated, restrictTo('admin', 'user'), ticketController.createTicket);
router
    .route('/:id')
    .get(ensureAuthenticated, restrictTo('admin', 'user'), ticketController.getTicket)
    .patch(ensureAuthenticated, restrictTo('admin', 'user'), ticketController.updateTicket)
    .delete(ensureAuthenticated, restrictTo('admin', 'user'), ticketController.deleteTicket);

module.exports = router;
