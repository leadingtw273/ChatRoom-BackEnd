const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatcrypt-c2016.firebaseio.com"
});

let db = admin.firestore().collection("chatroom");

const firebaseDb = {
  readRooms() {
    const read = [];
    return db
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          read.push({
            id: doc.id,
            ...doc.data()
          });
        });
        return read;
      })
      .catch(err => { throw err });
  },
  addRoom(data) {
    return db
      .add(data)
      .then(docRef => docRef.get())
      .then(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .catch(err => { throw err });
  },
  readMsg(roomId) {
    const read = [];
    return db
      .doc(roomId)
      .collection("messages")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => read.push({ id: doc.id, ...doc.data() }));
        return read;
      })
      .catch(err => { throw err });
  },
  addMsg(roomId, data) {
    return db
      .doc(roomId)
      .collection("messages")
      .add(data)
      .then(docRef => docRef.get())
      .then(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })
      .catch(err => { throw err });
  }
};

module.exports = firebaseDb;
