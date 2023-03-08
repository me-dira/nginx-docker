const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const fs = require('fs');

const authEnv = process.env.AUTHENTICATION_STRATEGY || 'local';
const authStrategy = require(`./auth/strategies/${authEnv}`);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require(`./routes/${authEnv}`);

const session = require('express-session')
const secretDir = process.env.SESSION_SECRET_DIR || './../session-secret';

const sessionSecret = (() => {
  try {
    fs.readFileSync(`${secretDir}/everest-session-secret`);
  } catch (e) {
    if (e.code === 'ENOENT') return 'secret for local';
    throw  e;
  }
})();

const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false
  }
};

const app = express();

app.use(session(sessionOptions));

passport.use(authStrategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/',
  passport.authenticate(authEnv, { successRedirect: '/' })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
