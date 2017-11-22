var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');

mongoose.connect(config.db.uri);

app.use(morgan('dev'));
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.sendfile('./index.html')
});

var authUser = require('./authService');

app.get('/auth', authUser);

app.get('/login', function (request, response) {
    response.redirect(config.instagram.auth_url);
});

app.listen(3000);
console.log('App is runung on port 3000');

