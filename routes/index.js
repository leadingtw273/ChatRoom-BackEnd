const express = require('express');
const router = express.Router();
const db = require('../models/firebaseDB');

router.get('/rooms', (req, res) => {
  db
  .readRooms()
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

router.post('/rooms', (req, res) => {
  db
  .addRoom(req.body)
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

module.exports = router;
