var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(express.static('client'));

// not sure if i need this or if express.static covers it ???
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// what will the post url be ???
// something like data/cache
app.post('data/cache', function(req, res) {
	// use req.body to send objects to db
	// res.sendStatus(200);
})

// if it exists, get cached data from db on api call
app.get('data', function(req, res) {
	
})

var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port', port);

// --------------------------------------------
// var knex = require('knex');

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './github-fetcher.sqlite3'
//   }
// });

// app.post('/repos/import', function (req, res) {
//   // TODO
//   req.body.forEach(function(repo) {
//     knex('repos').insert({id: repo.id, url: repo.url, username: repo.user, repo_name: repo.repoName, stargazers: repo.gazers})
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
