var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');

var config = require('./config');

mongoose.connect(config.db.uri);

app.use(morgan('dev'));
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.sendfile('./index.html')
});

var authUser = require('./authService');

app.get('/auth', authUser);

// app.get('/test', function (req, res) {
//     axios.get('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=183919697.cdb951d.9f17f9a46a424ed7b45f4b06f4d9b295')
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     // fetch('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=183919697.cdb951d.9f17f9a46a424ed7b45f4b06f4d9b295')
//     // .then(function (response) {
//     //     return response.blob();
//     // }).then(function (myBlob) {
//     //     // var objectURL = URL.createObjectURL(myBlob);
//     //     // myImage.src = objectURL;
//     //     console.log(myBlob);
//     // });
// })

app.get('/login', function (request, response) {
    response.redirect(config.instagram.auth_url);
});

app.listen(3000);
console.log('App is runung on port 3000');

