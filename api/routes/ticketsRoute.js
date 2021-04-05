const express = require('express');
const ticketController = require('./../controller/ticketController');
const {ensureAuthenticated, restrictTo} = require("../controller/authController");
const router = express.Router();


router.route('/top').get(ticketController.aliasFilter, ticketController.allTickets);
router.route('/totalOpened').get(ensureAuthenticated, ticketController.totalOpened);
router.route('/totalClosed').get(ensureAuthenticated, ticketController.totalClosed);
router.route('/totalHigh').get(ensureAuthenticated, ticketController.totalHigh);
router.route('/totalMedium').get(ensureAuthenticated, ticketController.totalMedium);
router.route('/totalLow').get(ensureAuthenticated, ticketController.totalLow);
router.route('/totalToday').get(ensureAuthenticated, ticketController.todayTickets);
router.route('/dueExceed').get(ensureAuthenticated, ticketController.dueExceeded);
router.route('/created').get(ensureAuthenticated, ticketController.createdByMe, ticketController.allTickets);
router.route('/assigned').get(ensureAuthenticated, ticketController.assignedToMe, ticketController.allTickets);

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
