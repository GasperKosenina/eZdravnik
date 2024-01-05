import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import api from '../../services/api';

export default function Zahtevek() {
  const [datumRojstva, setDatumRojstva] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [spol, setSpol] = React.useState('Moški');
  const [alergije, setAlergije] = React.useState('');
  const [bolezniDruzine, setBolezniDruzine] = React.useState('');
  const [zdravila, setZdravila] = React.useState('');
  const [simptomi, setSimptomi] = React.useState('');
  const [zivljenjskiSlog, setZivljenjskiSlog] = React.useState('');
  const [dodatniKontekst, setDodatniKontekst] = React.useState('');


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datumRojstva;
    setShowDatePicker(Platform.OS === 'ios'); // Keep the date picker open on iOS
    setDatumRojstva(currentDate);
  };

  const handleSubmit = async () => {
    const data = {
      datum_rojstva: datumRojstva.toLocaleDateString(),
      spol: spol === 'Moški' ? true : false,
      opis_simptomov: simptomi,
      alergije: alergije,
      bolezni_v_druzini: bolezniDruzine,
      zdravila: zdravila,
      zivljenjski_slog: zivljenjskiSlog,
      dodatni_kontekst: dodatniKontekst,
    };

    try {
      const response = await api.post('/chatGPT/BXbIWZVGKheN11QV5AwD0MF7f1z1', data);
      console.log(response.data.odgovor.odgovor)
    } catch (error) {
      console.error('Napaka:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Osnovni podatki pacienta:</Text>

      <TouchableOpacity
        style={styles.datePickerInput}
        onPress={() => setShowDatePicker(true)}>
        <Text>{datumRojstva.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={datumRojstva}
          mode="date"
          display="default"
          onChange={onChange}
          themeVariant="dark"
        />
      )}

      <RadioButton.Group onValueChange={newValue => setSpol(newValue)} value={spol}>
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <RadioButton
              value="Moški"
              color={spol === 'Moški' ? '#18ada5' : 'grey'}
              uncheckedColor='grey'
            />
            <Text>Moški</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="Ženska"
              color={spol === 'Ženska' ? '#18ada5' : 'grey'}
              uncheckedColor='grey'
            />
            <Text>Ženska</Text>
          </View>
        </View>
      </RadioButton.Group>

      <TextInput
        style={styles.input}
        onChangeText={setSimptomi}
        value={simptomi}
        multiline
        placeholder="Opis simptomov"
      />

      <TextInput
        style={styles.input}
        onChangeText={setAlergije}
        value={alergije}
        placeholder="Alergije"
      />

      <TextInput
        style={styles.input}
        onChangeText={setBolezniDruzine}
        value={bolezniDruzine}
        placeholder="Bolezni v družini"
      />

      <TextInput
        style={styles.input}
        onChangeText={setZdravila}
        value={zdravila}
        placeholder="Zdravila"
      />
      <TextInput
        style={styles.input}
        onChangeText={setZivljenjskiSlog}
        value={zivljenjskiSlog}
        multiline
        placeholder="Življenjski slog"
      />

      <TextInput
        style={styles.input}
        onChangeText={setDodatniKontekst}
        value={dodatniKontekst}
        multiline
        placeholder="Dodatni kontekst"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Pošlji zahtevek</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50, // RAZMIK OD VRHA
    paddingBottom: 20, // RAZMIK DNO
    paddingHorizontal: 10, // RAZMIK STRANI
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
  datePickerInput: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 5,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 5,
    textAlignVertical: 'center', //ZA ANDROID
    paddingTop: Platform.OS === 'ios' ? 10 : 0, // ZA IOS
    paddingBottom: Platform.OS === 'ios' ? 10 : 0, // ZA IOS
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40, // PROSTOR MED RADIO GUMBI
  },
  button: {
    backgroundColor: '#18ada5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
