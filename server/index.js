var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var request = require('request');
// var mongoose = require('mongoose');
// var db = require('../app/models/config.js');
// var Graph = require('../app/models/graph-schema.js');


var app = express();
module.exports = app;

// mongoose.connect('mongodb://localhost/wagegap');

app.use(bodyParser.json());
app.use(express.static('client'));


// not sure if i need this or if express.static covers it ???
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });


// occupation/gender | location/gender | race/gender
app.get('/graph', function(req, res) {
	var query = req.body;

	Graph.find(query, function(err, docs) {
		console.log('sending query to db');
		if (err) {
			console.log('error: ', err);
			res.send('retrieval error');
		}
		else {
			console.log('docs retrieved: ', docs);
			res.json(docs);
			console.log('send data')
		}
	})


});

// });



// ORIGINAL API GET REQUEST HANDLER
// app.get('/data', function(req, res) {
// // handle front-end get request
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


// --------------------------------------------


// app.post('/repos/import', function (req, res) {
//   // TODO
//   req.body.forEach(function(repo) {
//     knex('repos').insert({id: repo.id})
//       .then(function(result) {
//         console.log('end')
//     })
//   });
//   res.sendStatus(200)
// });


// app.get('/repos', function (req, res) {
//   knex('repos').orderBy('stargazers', 'desc')
//     .then(function(data) {
//       data = JSON.stringify(data);
//       res.end(data);
//      })
// });
