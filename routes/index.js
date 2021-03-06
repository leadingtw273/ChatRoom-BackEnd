const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const db = require('../models/firebaseDB');

// 取得所有房間
router.get('/rooms', (req, res) => {
  db
  .readRooms()
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

// 新增房間
router.post('/rooms', (req, res) => {
  db
  .addRoom({
    createTime: dayjs().format(),
    ...req.body
  })
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

module.exports = router;
