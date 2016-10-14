var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});



var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port', port);
