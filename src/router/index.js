const express = require('express');
const routes = express.Router();

routes.use('/users/', require('./users.js'));
routes.use('/bloggers/', require('./bloggers.js'));

module.exports = routes;
