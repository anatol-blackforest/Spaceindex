const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {connection, getAccount} = require('./controllers');
const {home, about, add, edit, search, planets, moons, install, login, logout, failureAuth} = require('./routes');
const {sessionKey} = require('./config');

const app = express();

// view engine setup
app.set("twig options", {strict_variables: false});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({keys: [sessionKey]}));
app.use(passport.initialize());
app.use(passport.session());

//коннекты к базе
app.use(async(req, res, next) => await connection(req, next))

//проверяем админский хэш в сессии
passport.use(new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => getAccount(req, username, password, done).catch(() => done(null, false))));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use('/', home);
app.use('/about', about);
app.use('/planets', planets);
app.use('/moons', moons);
app.use('/add', add);
app.use('/edit', edit);
app.use('/search', search);
app.use('/install', install);
app.use('/login/', login);
app.use('/logout/', logout);
app.use('/fail', failureAuth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//горячее выключение сервера
process.on('exit', () => mongoose.disconnect())

module.exports = app;
