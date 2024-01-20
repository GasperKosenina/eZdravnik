import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Typewriter from 'react-native-typewriter';

export default function Domov({ navigation }) {
  const [showSecondSentence, setShowSecondSentence] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondSentence(true);
    }, 3300); // MILISEKUNDE ZAMIKA

    return () => clearTimeout(timer); // OČISTI TIMER
  }, []);

  return (
    <View style={styles.container}>

        <Image
        source={require('../img/eZdravnik_logo.png')}
        style={styles.logo}
        />

      <Typewriter
        typing={1}
        minDelay={20}
        maxDelay={30}
        style={styles.typewriterText}
      >
        Pozdravljeni v eZdravniku, vašem digitalnem svetovalcu za zdravje.
      </Typewriter>
      {showSecondSentence && (
        <Typewriter
          typing={1}
          minDelay={20}
          maxDelay={30}
          style={styles.typewriterText}
        >
          Tu sem, da vam pomagam hitro in zanesljivo.
        </Typewriter>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Zahtevek')}
      >
        <Text style={styles.buttonText}>Pošli svoj prvi zahtevek</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // BELO OZADJE
  },
  logo: {
    width: 350, 
    height: 350, 
    resizeMode: 'contain',
    marginBottom: -40, 
  },
  typewriterText: {
    fontSize: 18, 
    textAlign: 'center',
    paddingHorizontal: 10, 
    marginBottom: 15, 
  },
  button: {
    backgroundColor: '#18ada5', // TURKIZNA BARVA GUMBA
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%', 
    marginTop: 20,
    marginBottom: 50, 
  },
  buttonText: {
    color: '#ffffff', 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16, 
  },
});
