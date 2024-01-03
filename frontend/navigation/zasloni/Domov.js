import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Typewriter from 'react-native-typewriter';

export default function Domov({ navigation }) {
  const [showSecondSentence, setShowSecondSentence] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondSentence(true);
    }, 4300); // MILISEKUNDE ZAMIKA

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
        minDelay={30}
        maxDelay={60}
        style={styles.typewriterText}
      >
        Pozdravljeni v eZdravniku, vašem digitalnem svetovalcu za zdravje.
      </Typewriter>
      {showSecondSentence && (
        <Typewriter
          typing={1}
          minDelay={65}
          maxDelay={95}
          style={styles.typewriterText}
        >
          Tu smo, da vam pomagamo hitro in zanesljivo.
        </Typewriter>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Zahtevek')}
      >
        <Text style={styles.buttonText}>Sprobajte vaš prvi zahtevek</Text>
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
    width: 300, 
    height: 300, 
    resizeMode: 'contain',
    marginBottom: 10, 
  },
  typewriterText: {
    fontSize: 18, 
    textAlign: 'center',
    paddingHorizontal: 10, 
    marginBottom: 20, 
  },
  button: {
    backgroundColor: '#18ada5', // MODRA BARVA GUMBA
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
