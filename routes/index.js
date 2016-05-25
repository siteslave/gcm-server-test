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
    .count('* as total')
    .where({ username: username })
    .then(function (rows) {
      if (rows[0].total > 0) {
        return db('devices')
          .update({ token: token })
          .where({ username: username });
      } else {
        return db('devices')
          .insert({
            username: username,
            token: token
          });
      }
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

router.get('/users/list', function (req, res, next) {
  var db = req.db;
  // SELECT * FROM devices
  db('devices')
    .select()
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
     })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
     });

});

router.post('/send', function (req, res, next) {

  var username = req.body.username;
  var _message = req.body.message;

  var db = req.db;

  console.log(req.body);

  db('devices')
    .select()
    .where({username: username})
    .then(function (rows) {
      var token = rows[0].token;

      var gcm = require('node-gcm');
      var message = new gcm.Message();

      message.addData('title', 'ทดสอบ');
      message.addData('message', _message);
      message.addData('content-available', true);

      var regTokens = [token];

      // Set up the sender with you API key
      var sender = new gcm.Sender('AIzaSyCKChSCsBci6BRju2bB9SvFiSa2Mo4w1vM');

      // Now the sender can be used to send messages
      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) {
          console.error(err);
          res.send({ ok: false, msg: err });

        } else {
          console.log(response);
          res.send({ ok: true });
        }
      });
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });

});

module.exports = router;
