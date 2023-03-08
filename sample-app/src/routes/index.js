var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},(req, res, next) => {
  req.session.cookie.expires = new Date(Date.now() + 10 * 1000);
  res.render('index', { title: 'Express', username: req.user});
});

module.exports = router;
