const express = require('express');
const router = express.Router();
const {ensureAuthenticated, restrictTo} = require('./../controller/authController');
const userController = require('./../controller/userController');

router
    .route('/').get( userController.allUsers)
    .post(userController.createUser);

router
    .route('/:id').get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
