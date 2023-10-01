const path = require('path')
const createError = require('http-errors');
const express =  require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const routes = require('./router');
const app = express();
const port = 3000;

const db = require('./config/db/index');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', engine({
    extname: '.hbs', 
    // defaultLayout: false
    partialsDir: [
        // Thư mục chứa các partial views
        __dirname + '/resource/views/layouts/partials',
    ],
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'))

app.use(routes);

app.use(function (req, res, next) {
    next(createError.NotFound('This route is not exist.'))
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({
            status: err.status || 500,
            message: err.message
        })
});

app.listen(port, () => console.log(`listen port: ${port}`))