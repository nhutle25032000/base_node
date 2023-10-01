const express = require('express');
const routes = express.Router();

const AuthController = require('../app/controllers/AuthController');

/** Auth */
routes.post('/auth/login', AuthController.login);
routes.get('/auth/logout', AuthController.logout);
routes.get('/auth/change-password', AuthController.changePassword);
routes.get('/auth/forget-password', AuthController.forgetPassword);
routes.get('/auth/update-profile', AuthController.updateProfile);

module.exports = routes;
