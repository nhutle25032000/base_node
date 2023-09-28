const express = require('express');
const routes = express.Router();

const BlogController = require('../app/controllers/admin/BlogController');


/** blog */
routes.get('/blog/create', BlogController.create);
routes.get('/blog/edit', BlogController.edit);
routes.get('/blog', BlogController.index);

module.exports = routes;
