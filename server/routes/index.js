var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  res.send({
    message: `hello world! register by ${req.body.email}`
  });
});

module.exports = router;
