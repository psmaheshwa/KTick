const express = require('express');
const router = express.Router();
const authController = require('./../controller/authController')

router.route('/').get(authController.login)

router.route('/logout').get(authController.logout);

router.route('/redirect').get(authController.redirect)

module.exports = router;
