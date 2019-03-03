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
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const routine = require('./routes/routine');
const notFound = require('./routes/notFound');
const tutorial = require('./routes/tutorial');
const user = require('./routes/user');
const mongoose = require('./mongoose');
const session = require('client-sessions');

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
app.use(session({
  cookieName: 'session',
  secret: 'some-secret',
  saveUninitialized: false,
  resave: false
}));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', tutorial.view);
app.get('/home', index.view);
app.get('/communityFeed', communityFeed.view);
app.get('/createRoutine', routine.viewCreateRoutine);
app.post('/createRoutine', routine.addRoutine);
app.get('/createRoutineAlt', routine.viewCreateRoutineAlt);
app.get('/currentRoutines', routine.viewAllCurrentRoutines);
app.get('/editRoutine/:id', routine.viewEditRoutine);
app.post('/routine/edit/:id', routine.editRoutine);
app.post('/routine/delete/:id', routine.deleteRoutine);
app.post('/routine/delete/previous/:id', routine.deletePreviousRoutine);
app.post('/routine/complete/:id', routine.completeRoutine);
app.get('/previousRoutines', routine.viewAllPreviousRoutines);
app.get('/help', help.view);
app.get('/login', login.view);
app.get('/signup', signup.view);
app.get('/profile', profile.view);
app.get('/tutorial', tutorial.view);
app.get('/routine/:id', routine.viewCurrentRoutine);
app.get('/routine/previous/:id', routine.viewPreviousRoutine);
app.post('/routine/:id', routine.updateCompletionLog);
app.post('/createUser', signup.createUser);
app.get('/verifyEmailUnique/:email', signup.verifyEmailUnique);
app.post('/login', login.loginUser);
app.get('/logout', user.logout);
app.get('/getUserInfo/:email', user.getUserInfo);
app.use(notFound.view); // 404 route

mongoose.connect(function () {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
})
