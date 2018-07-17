const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatcrypt-c2016.firebaseio.com'
});

let db = admin.firestore().collection('chatroom');

let read = [];

const firebaseDb = {
  readRoomList() {
    read = [];
    let data = db.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          read.push(doc.data());
        });
        return read;
      })
      .catch((err) => {
        return err;
      });
    return data;
  },
  readMsg(roomId) {
    read = [];

    let data = db.where('id', '==', roomId).get()
      .then((snapshot) => {
        let id = 0;
        snapshot.forEach((doc) => {
          id = doc.id;
        });
        return id;
      }).then((id) => {
        return db.doc(id).collection('messages').get();
      }).then((snapshot) => {
        snapshot.forEach((doc) => {
          read.push(doc.data());
        });
        return read;
      });

    // let data = db.doc(roomId).collection('messages').get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       read.push(doc.data());
    //     });
    //     return read;
    //   })
    //   .catch((err) => {
    //     return err;
    //   });

    return data;
  },
  setRoomList() {
    read = [];

    let room = {
      id: 2,
      createBy: 'leadingtw',
      key: 'qazwsxedc',
      roomName: 'add test'
    };

    db.doc('02').set(room);

    return room;
  },
};

module.exports = firebaseDb;
