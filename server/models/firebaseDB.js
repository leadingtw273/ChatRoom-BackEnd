const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatcrypt-c2016.firebaseio.com'
});

let db = admin.firestore().collection('chatroom');

// firebase 資料更新測試
// let data = [];
// db.onSnapshot(snapshot => {
//   snapshot.forEach((doc) => {
//     data.push(doc.data());
//   });
//   console.log(`Received doc snapshot: ${snapshot}`);
//   console.log(data);
//   data = [];
// });

const firebaseDb = {
  readRooms() {
    let read = [];

    return db.get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          read.push(doc.data());
        });
        return read;
      })
      .catch(err => {
        return err;
      });
  },
  readRoom(roomId) {
    let read = [];

    return db.where('id', '==', roomId).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          read.push(doc.data());
        });
        return read;
      })
      .catch(err => {
        return err;
      });
  },
  readMsg(roomId) {
    let read = [];

    return db.where('id', '==', roomId).get()
      .then(snapshot => {
        let id = 0;
        snapshot.forEach(doc => id = doc.id);
        return id;
      })
      .then(id => db.doc(id).collection('messages').get())
      .then(snapshot => {
        snapshot.forEach(doc => read.push(doc.data()));
        return read;
      })
      .catch(err => {
        return err;
      });
  },
  addRoom(data) {
    return db.add(data)
      .then(documentReference => documentReference.id)
      .catch(err => {
        return err;
      });
  },
  addMsg(roomId, data) {
    return db.where('id', '==', roomId).get()
      .then(snapshot => {
        let id = 0;
        snapshot.forEach(doc => id = doc.id);
        return id;
      })
      .then(id => db.doc(id).collection('messages').add(data))
      .then(documentReference => documentReference.id)
      .catch(err => {
        return err;
      });
  },
};

module.exports = firebaseDb;
