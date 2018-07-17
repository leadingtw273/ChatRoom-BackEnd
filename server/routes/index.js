const express = require('express');
const router = express.Router();
const db = require('../models/firebaseDB');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/readMsg', (req, res) => {
  db.readMsg(0).then((read) => {
    console.log(read);
    res.send(
      read
    );
  });
});

router.post('/readRoomList', (req, res) => {
  db.readRoomList().then((read) => {
    console.log(read);
    res.send(
      read
    );
  });
});

router.post('/setRoomList', (req, res) => {
  res.send(
    db.setRoomList()
  );
});

module.exports = router;
