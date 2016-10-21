var mongoose = require('mongoose');
// var init = require('../init-data.js')

//might need to change URI later
mongoURI = 'mongodb://127.0.0.1:58331/Graph';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // init();
  console.log('Mongodb connection open');
});

module.exports = db;
