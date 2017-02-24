'use strict';

const express = require('express'),
    http = require('http'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');


// set up our socket server
require('./routes/socket')(io);

// view engine setup (for later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware settings
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// for dev
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // have no favicon ;)
app.use(express.static('../mosquito-web/app'));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// start the server
server.listen(3000);

module.exports = app;