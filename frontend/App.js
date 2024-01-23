import * as React from 'react';
import Routing from './navigation/Routing';
import Prijava from './navigation/zasloni/Prijava';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { useEffect } from 'react';

const App = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <>
          {user ? <Routing /> : <Prijava />}
    </>
  );
}

export default App;