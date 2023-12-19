import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Domov from './zasloni/Domov';
import Profil from './zasloni/Profil';
import Zahtevek from './zasloni/Zahtevek';
import Zemljevid from './zasloni/Zemljevid';
import Zgodovina from './zasloni/Zgodovina';


const domovZaslon = "eZdravnik";
const profilZaslon = "Profil";
const zahtevekZaslon = "Zahtevek";
const zemljevidZaslon = "Zemljevid";
const zgodovinaZaslon = "Zgodovina";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={domovZaslon}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === domovZaslon) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === zahtevekZaslon) {
                            iconName = focused ? 'pencil' : 'pencil-outline';
                        }
                        else if (rn === zgodovinaZaslon) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === zemljevidZaslon) {
                            iconName = focused ? 'map' : 'map-outline';
                        } else if (rn === profilZaslon) {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'purple',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
                    tabBarStyle: { height: 70 }
                })}
            >
                <Tab.Screen name={domovZaslon} component={Domov} />
                <Tab.Screen name={zahtevekZaslon} component={Zahtevek} />
                <Tab.Screen name={zgodovinaZaslon} component={Zgodovina} />
                <Tab.Screen name={zemljevidZaslon} component={Zemljevid} />
                <Tab.Screen name={profilZaslon} component={Profil} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default MainContainer;