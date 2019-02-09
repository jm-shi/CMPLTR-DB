
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express-handlebars')

const index = require('./routes/index');
const communityFeed = require('./routes/communityFeed');
const createRoutine = require('./routes/createRoutine');
const currentRoutines = require('./routes/currentRoutines');
const previousRoutines = require('./routes/previousRoutines');
const help = require('./routes/help');
const login = require('./routes/login');
const profile = require('./routes/profile');

const app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/createRoutine', createRoutine.view);
app.get('/communityFeed', communityFeed.view);
app.get('/currentRoutines', currentRoutines.view);
app.get('/previousRoutines', previousRoutines.view);
app.get('/help', help.view);
app.get('/login', login.view);
app.get('/profile', profile.view);
app.post('/addRoutine', createRoutine.addRoutine);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// // Connection URL
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'cmpltr';
// // Use connect method to connect to the server
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   client.close();
// });