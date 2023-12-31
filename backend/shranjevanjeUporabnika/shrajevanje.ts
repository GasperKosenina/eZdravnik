import admin from "../config/firebaseConfig";
import userSync from "./uporabnikBaza";



const syncUsers = async () => {
    try {
      const listUsersResult = await admin.auth().listUsers();
      listUsersResult.users.forEach((userRecord) => {
        userSync(userRecord);
      });
      console.log('Sinhronizacija uporabnikov s Firestore uspešna.');
    } catch (error) {
      console.error('Napaka pri sinhronizaciji uporabnikov s Firestore:', error);
    }
  };
  setInterval(syncUsers, 5000);


  export default syncUsers;