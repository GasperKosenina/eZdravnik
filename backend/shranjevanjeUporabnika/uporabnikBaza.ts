// userSync.js

import admin from "../config/firebaseConfig";

const userSync = async (user: any) => {
  if (user) {
    const { uid, email } = user;

    const db = admin.firestore();
    const usersCollection = db.collection("uporabniki");

    await usersCollection.doc(uid).set({
      email: email,
      uid: uid,
    });
  } else {
    console.log("Uporabnik se je odjavil.");
  }
};

export default userSync;
