
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise
// //might need to change URI later
// mongoURI = 'mongodb://localhost:27017/Graph';
// mongoose.connect(mongoURI);
//
// // Run in seperate terminal window using 'mongod'
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongodb connection open');
// });
//
//
// var graphSchema = mongoose.Schema({
//   //location will be a state -- optional
//   location: String,
//   //income will need to be part of every query
//   income: { type:Number, required: true },
//   //gender optional
//   gender: String,
//   //occupation optional
//   occupation: String,
//   //race optional
//   race: String
// });
//
// var Graph = mongoose.model('Graph', graphSchema);
//
// module.exports = Graph;
