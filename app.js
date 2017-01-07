var express = require('express');
var app = express();

var port = process.env.port || 3000
app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', 'src/views');
app.set('view engine', 'ejs')

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/booksAPI');
mongoose.connect('mongodb://vishalgcogni:river808@ds127988.mlab.com:27988/booksapi');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var bookModel = require('./src/models/bookModel');
var bookRouter = require('./src/routes/bookRoutes')(bookModel);

// creating a admin router
var adminRouter = require('./src/routes/adminRoutes')();
app.use('/Admin', adminRouter);

// we ar going to use passport module provided by node use for middlewatre so we
// are doing before auth url middleware can do any job , here its performing
// cookie parser operation before we going to auth we are configuring cokie
// parser router session is also middleware

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: 'library'}))
require('./src/config/passport')(app); //we are passing app object to passport

var authRouter = require('./src/routes/authRoutes')();
app.use('/auth', authRouter);

app.use('/api', bookRouter); //middleware - last practical of today session
/**app.get('/', function(req,res){
    res.send('hello world');
})**/

app.get('/', function (req, res) {
    res.render('index', {
        nav: [
            {
                Link: 'api/Books',
                Text: 'Books'
            }, {
                Link: '/Admin/addBooks',
                Text: 'Admin'
            }
        ]
    })
})

app.listen(port, function (err) {
    console.log('server running');
})

// server will nto able to find index.html without below
// http:localhost:9090/src/views/index.html