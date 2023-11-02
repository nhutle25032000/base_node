const express = require('express');
const routes = express.Router();
const { verifyAccessToken, checkBloggerRole } = require('../app/helper/jwt_service');

routes.use('/users/', require('./users.js'));
routes.use('/bloggers/', verifyAccessToken, checkBloggerRole, require('./bloggers.js'));
routes.use('/admin', require('./admin.js'));
routes.use('/', require('./common.js'));

module.exports = routes;
