/*
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express-handlebars');

const index = require('./routes/index');
const communityFeed = require('./routes/communityFeed');
const help = require('./routes/help');
const login = require('./routes/login');
const profile = require('./routes/profile');
const routine = require('./routes/routine');
const notFound = require('./routes/notFound');

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
app.get('/communityFeed', communityFeed.view);
app.get('/createRoutine', routine.viewCreateRoutine);
app.get('/currentRoutines', routine.viewAllCurrentRoutines);
app.post('/currentRoutines', routine.addRoutine);
app.get('/editRoutine/:id', routine.viewEditRoutine);
app.get('/previousRoutines', routine.viewAllPreviousRoutines);
app.get('/help', help.view);
app.get('/login', login.view);
app.get('/profile', profile.view);
app.get('/routine/:id', routine.viewCurrentRoutine);
app.post('/routine/:id', routine.updateCompletionLog);
app.use(notFound.view); // 404 route

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
