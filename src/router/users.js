const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {return res.send('1234')})

module.exports = routes;
