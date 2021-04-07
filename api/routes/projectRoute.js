const express = require('express');
const projectController = require('./../controller/projectController');
const {ensureAuthenticated, restrictTo} = require("../controller/authController");
const router = express.Router();


router
    .route('/')
    .get(ensureAuthenticated,projectController.allProjects)
    .post(ensureAuthenticated, restrictTo('admin'),projectController.createProject);
router
    .route('/:id')
    .get(ensureAuthenticated,projectController.getProject)
    .patch(ensureAuthenticated, restrictTo('admin'),projectController.updateProject)
    .delete(ensureAuthenticated, restrictTo('admin'),projectController.deleteProject);

module.exports = router;
