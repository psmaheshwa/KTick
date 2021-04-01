const express = require('express');
const projectController = require('./../controller/projectController');
const {ensureAuthenticated, restrictTo} = require("../controller/authController");
const router = express.Router();


router
    .route('/')
    .get(projectController.allProjects)
    .post(projectController.createProject);
router
    .route('/:id')
    .get(projectController.getProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;
