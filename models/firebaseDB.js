const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatcrypt-c2016.firebaseio.com"
});

let db = admin.firestore().collection("chatroom");

const firebaseDb = {
  readRooms() {
    let read = [];
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
      .catch(err => err);
  },
  addRoom(data) {
    return db
      .add(data)
      .then(docRef => docRef.get())
      .then(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .catch(err => err);
  },
  readMsg(data) {
    let read = [];
    return db
      .doc(data.id)
      .collection("messages")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => read.push({ id: doc.id, ...doc.data() }));
        return read;
      })
      .catch(err => err);
  },
  addMsg(data) {
    return db
      .doc(data.roomId)
      .collection("messages")
      .add(data.message)
      .then(docRef => docRef.get())
      .then(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })
      .catch(err => err);
  }
};

module.exports = firebaseDb;
