const express = require("express");
const router = express.Router();
const fireDB = require("../models/firebaseDB");
const dayjs = require('dayjs');

const roomInfo = {};

const socketApi = io => {
  io.on("connection", socket => {

    // 獲取房間ID
    const url = socket.request.headers.referer;
    const splited = url.split('/');
    const roomID = splited[splited.length - 1];   
    
    // 設定使用者
    let user = '';

    // 加入房間
    socket.on('join', (userName) => {
      user = userName;

      // 設定使用者到房間內
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = [];
      }
      roomInfo[roomID].push(user);

      // join 房間
      socket.join(roomID);
      io.to(roomID).emit('system', `${user} 加入房間`);
      
      // 取得所有房間內訊息
      fireDB
        .readMsg(roomID)
        .then(msg => {
          socket.emit("messages", msg);
        })
        .catch(err => console.log(err));

      console.log('**************************************');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log(`${user} 加入房間`);
      console.log('**************************************');
    });

    // 離開房間
    socket.on('leave', () => {
      // 房間不存在則直接退出
      if(roomInfo[roomID] == null){
        return false;
      }

      // 設定使用者退出房間
      const index = roomInfo[roomID].indexOf(user);
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1);
      }

      // leave 房間
      socket.leave(roomID);
      io.to(roomID).emit('system', `${user} 退出房間`);

      console.log('**************************************');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log(`${user} 退出房間`);
      console.log('**************************************');
    });

    socket.on("getMessage", () => {
      console.log('-------------------------------------------------------------------');
      console.log('EVENT: getMessage');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log('-------------------------------------------------------------------');
      
      // 取得房間內所有訊息
      fireDB
        .readMsg(roomID)
        .then(msg => {
          socket.emit("messages", msg);
        })
        .catch(err => console.log(err));
    });

    socket.on("setMessage", (data) => {
      console.log('-------------------------------------------------------------------');
      console.log('EVENT: setMessage');
      console.log('ROOM ID: ', roomID );
      console.log('ID: ', socket.id);
      console.log('DATA: ', data);
      console.log('-------------------------------------------------------------------');
      
      // 將新訊息存入資料庫
      fireDB
        .addMsg(roomID,{
          createTime: dayjs().format(),
          ...data
        })
        .then(message => {
          io.to(roomID).emit("pushMessage", message);
        })
        .catch(err => console.log(err));
    });

    socket.on("disconnect", () => {});
  });

  return router;
};

module.exports = socketApi;
