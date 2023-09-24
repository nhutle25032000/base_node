const path = require('path')
const express =  require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const routes = require('./router');
const app = express();
const port = 3000;

app.use(routes);

 app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.engine('hbs', engine({
    extname: '.hbs', 
    // defaultLayout: false
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'))

app.get('/home', (req, res) => { 
    res.render('home')
 });

app.get('/new', (req, res) => { 
    res.render('new')
});

app.get('/form', (req, res) => {
    console.log(123);
    res.render('form');
})

app.listen(port, () => console.log(`listen port: ${port}`))