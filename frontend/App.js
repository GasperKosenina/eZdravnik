import { onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useEffect } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Routing from "./navigation/Routing";
import Prijava from "./navigation/zasloni/Prijava";

const App = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return <>{user ? <Routing /> : <Prijava />}</>;
};

export default App;
