const path = require('path')
const express =  require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const routes = require('./router');
const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`listen port: ${port}`))