import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { getAuth } from 'firebase/auth';

import Domov from './zasloni/Domov';
import Profil from './zasloni/Profil';
import Zahtevek from './zasloni/Zahtevek';
import Zemljevid from './zasloni/Zemljevid';
import Zgodovina from './zasloni/Zgodovina';



const CustomScreenTitle = () => {
  return (
    <Text style={{ fontSize: 17, fontWeight: '600' }}>
      <Text style={{ color: '#18ada5' }}>e</Text>Zdravnik
    </Text>
  );
};

const Tab = createBottomTabNavigator();





function Routing() {
  const user = getAuth();
  const userId = user.currentUser.uid;

  const [seznam, setSeznam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/odgovori/vse/${userId}`);
        setSeznam(response.data.odgovor_zahtevek);
      } catch (error) {
        console.error("Napaka pri pridobivanju podatkov", error);
      }
    };
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await api.get(`/odgovori/vse/${userId}`);
      setSeznam(response.data.odgovor_zahtevek);
    } catch (error) {
      console.error("Napaka pri pridobivanju podatkov", error);
    }
  };

  const handleAdd = () => {
    fetchData();
  }




  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="eZdravnik"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "eZdravnik") {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === "Zahtevek") {
                iconName = focused ? 'pencil' : 'pencil-outline';
              } else if (route.name === "Zgodovina") {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === "Prva pomoč") {
                iconName = focused ? 'medkit' : 'medkit-outline';
              } else if (route.name === "Profil") {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#18ada5',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
            tabBarStyle: {}
          })}
        >
          <Tab.Screen
            name="eZdravnik"
            component={Domov}
            options={{ headerTitle: () => <CustomScreenTitle /> }}
          />
          <Tab.Screen name="Zahtevek">{() => <Zahtevek dodaj={handleAdd} />}</Tab.Screen>
          <Tab.Screen name="Zgodovina">{() => <Zgodovina seznam={seznam} />}</Tab.Screen>
          <Tab.Screen name="Prva pomoč" component={Zemljevid} />
          <Tab.Screen name="Profil" component={Profil} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}


export default Routing;


