const express = require('express');
const routes = express.Router();

routes.use('/users/', require('./users.js'));
routes.use('/bloggers/', require('./bloggers.js'));
routes.use('/admin', require('./admin.js'));
routes.use('/', require('./common.js'));

module.exports = routes;
