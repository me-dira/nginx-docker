const createError = require('http-errors');
const local = require('passport-local');

const localAuthStrategy = new local.Strategy(
  (username, password, done) => {
    if(username === 'hogehoge') {

      done(null, username);
    } else {
      done(createError(401, 'username: hogehogeさん以外はログインできません。'))
    }
  }
);

module.exports = localAuthStrategy;
