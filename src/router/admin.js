const express = require('express');
const routes = express.Router();

const DashboardController = require('../app/controllers/admin/DashboardController');
const BlogController = require('../app/controllers/admin/BlogController');

/** dashboard */
routes.get('dashboard', DashboardController.index);

/** blog */
routes.get('/blog/create', BlogController.create);
routes.get('/blog/edit', BlogController.edit);
routes.get('/blog', BlogController.index);

module.exports = routes;
