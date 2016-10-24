var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var request = require('request');
// var db = require('../app/models/config.js');
// var Graph = require('../app/models/graph-schema.js');
var app = express();
var mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(express.static('client'));

mongoose.Promise = global.Promise
//might need to change URI later
mongoURI = 'mongodb://localhost:27017/test';

// Run in seperate terminal window using 'mongod'

// var Schema = mongoose.Schema;
mongoose.connect(mongoURI);
var db = mongoose.connection;
db.once('open', function () {
  console.log('Mongodb connection open');
});

db.on('error', console.error.bind(console, 'connection error:'));
var graphSchema = new mongoose.Schema({
  //location will be a state -- optional
  location: { type: String },
  //income will need to be part of every query
  income: { type:Number, required: true },
  //gender optional
  gender: {type: String},
  //occupation optional
  occupation: {type: String},
  //race optional
  race: {type: String}
});

var Graph = mongoose.model('Graph', graphSchema, 'Graph');




// pretty sure express.static handles this anyway
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


// POST request handler that takes an object from the user query and returns the income data
// for the relevant entries in the database
app.post('/graph', function(req, res) {
	var query = req.body;

	// the request query object has capitalized keys, but we need them
	// to be lowercase to retrieve the database entries
	for(var k in query){
		query[k.toLowerCase()] = query[k];
		delete query[k];
	}

	console.log('query: ', query);

	// query Graph database for docs that match the query object's properties,
	// get the relevant income property and send it back to front end
	Graph.find(query, {"income": 1}).exec(function(err, docs) {
		console.log('sending query to db');
		if (err) {
			console.log('error: ', err);
			return res.send('retrieval error');
		}
		else {
			console.log('docs retrieved: ', docs);
			return res.json(docs);
			console.log('send data')
		}
	});
});


///////////////////////////////////////////////////////////////////////////
// ORIGINAL API GET REQUEST HANDLER
// initally, we were going to make an api call for every user query and add
// the response to the database - but we ended up just hard-coding data for
// all the queries the user can make
////////////////////////////////////////////////////////////////////////////


// app.get('/graph', function(req, res) {
// // check for querystring in db
// 	// if it exists, return relevant cache
// 	// else call api
// 		// here's basic format for api call
// 		  request('http://api.census.gov/data/2015/acs1?get=NAME,B20002_003E&for=state:*', function (error, response, body) {
// 			  if (!error && response.statusCode == 200) {
// 			    console.log(body)
// 		  	}
// 		  })
// 		// then send data to front-end
// 		// and send data to db to cache
// })


var port = process.env.PORT || 4040;

app.listen(port);

console.log('Listening on port', port);


module.exports = app;
