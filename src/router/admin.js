const express = require('express');
const routes = express.Router();

const DashboardController = require('../app/controllers/admin/DashboardController');
const BlogController = require('../app/controllers/admin/BlogController');
const UserController = require('../app/controllers/admin/UserController');

/** dashboard */
routes.get('dashboard', DashboardController.index);

/** blog */
routes.get('/blogs/:slug', BlogController.getPostBySlug);
routes.post('/blogs/:slug', BlogController.updatePostStatus);
routes.get('/blogs', BlogController.index);

/** user */
routes.get('/users', UserController.index);
routes.post('/users/:id/update-status', UserController.updateUserStatus);
routes.post('/users/:id/update-posting-rights', UserController.updatePostingRights);

module.exports = routes;
