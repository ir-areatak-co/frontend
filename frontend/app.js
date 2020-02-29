
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');






app.use(cookieParser());
app.use(session({ secret: 'G~z52]V{`pS', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('statisch'))


app.set("views", "./view/");
app.set('view engine' , 'pug');

app.use(require('./routes'))

app.listen(3000,function(){
    console.log('app start ');
});

