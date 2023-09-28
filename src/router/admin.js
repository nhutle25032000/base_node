const express = require('express');
const routes = express.Router();

const DashboardController = require('../app/controllers/admin/DashboardController');

/** dashboard */
routes.get('dashboard', DashboardController.index);

module.exports = routes;
