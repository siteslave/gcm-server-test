var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST   /test
router.post('/register', function (req, res, next) {
  var token = req.body.token; // $_POST['']
  var username = req.body.username;

  var db = req.db;
  // INSERT INTO devices(username, token)
  // VALUES('username', 'token')

  db('devices')
    .insert({
      username: username,
      token: token
    })
    .then(function () {
      res.send({ ok: true });
    })
    .catch(function (err) {
      console.log(err);
      res.send({ ok: false, msg: err });
    });


  console.log(req.body);

  // res.send({ ok: true, msg: 'Hello world.' });

});

module.exports = router;
