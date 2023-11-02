const express = require('express');
const routes = express.Router();
const BlogController = require('../app/controllers/admin/BlogController');

routes.get('/blogs', BlogController.index)

module.exports = routes;
