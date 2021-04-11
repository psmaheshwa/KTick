const express = require('express');
const router = express.Router();
const {ensureAuthenticated, restrictTo} = require('./../controller/authController');
const userController = require('./../controller/userController');

router
    .route('/').get( ensureAuthenticated,userController.allUsers)
    .post(userController.createUser);

router
    .route('/:id').get(ensureAuthenticated,userController.getUser)
    .patch(ensureAuthenticated, restrictTo('admin'),userController.updateUser)
    .delete(ensureAuthenticated, restrictTo('admin'),userController.deleteUser);

module.exports = router;
