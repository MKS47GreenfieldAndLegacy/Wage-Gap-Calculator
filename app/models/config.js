var mongoose = require('mongoose');
mongoose.Promise = global.Promise
//might need to change URI later
mongoURI = 'mongodb://localhost:27017/Graph';

mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

module.exports = db;
