const express = require('express');
const router = express.Router();
const db = require('../models/firebaseDB');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/rooms', (req, res) => {
  console.log('123');
  db.readRooms().then(read => res.send(read));
});

router.get('/rooms/:roomId', (req, res) => {
  db.readRoom(Number(req.params.roomId)).then(read => res.send(read));
});

router.get('/rooms/:roomId/messages', (req, res) => {
  db.readMsg(Number(req.params.roomId)).then(read => res.send(read));
});

router.post('/rooms', (req, res) => {
  db.addRoom(req.body)
    .then(id => res.send({ state: true, id }))
    .catch(err => res.send({ state: false, err }));
});

router.post('/rooms/:roomId/messages', (req, res) => {
  db.addMsg(Number(req.params.roomId), req.body)
    .then(id => res.send({ state: true, id }))
    .catch(err => res.send({ state: false, err }));
});

module.exports = router;
