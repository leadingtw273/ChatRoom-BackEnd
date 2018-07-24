const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatcrypt-c2016.firebaseio.com'
});

let db = admin.firestore().collection('chatroom');

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
      .catch(err => err);
  },
  addRoom(data) {
    return db.add(data)
      .catch(err => err);
  },
  readMsg(data) {
    let read = [];
    return db.where('id', '==', data.id).get()
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
      .catch(err => err);
  },
  addMsg(data) {
    return db.where('id', '==', data.roomId).get()
      .then(snapshot => {
        let id = 0;
        snapshot.forEach(doc => id = doc.id);
        return id;
      })
      .then(id => db.doc(id).collection('messages').add(data.message))
      .catch(err => err);
  },
};

module.exports = firebaseDb;
