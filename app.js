var express = require('express');
var helmet = require('helmet');
var app = express();
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy());
var routes = require('./routes/Route');
var profileRoutes = require('./routes/ProfileRoute');
var session = require('express-session');
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use(session({secret:'1234',resave:false,saveUninitialized:false}));
app.use('/profile',profileRoutes);
app.use('/',routes);
app.listen(8080);

