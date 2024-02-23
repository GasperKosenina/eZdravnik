import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import Typewriter from "react-native-typewriter";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { getAuth } from "firebase/auth";

export default function Zahtevek({ dodaj }) {
  const [datumRojstva, setDatumRojstva] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [spol, setSpol] = React.useState("Moški");
  const [alergije, setAlergije] = React.useState("");
  const [bolezniDruzine, setBolezniDruzine] = React.useState("");
  const [zdravila, setZdravila] = React.useState("");
  const [simptomi, setSimptomi] = React.useState("");
  const [zivljenjskiSlog, setZivljenjskiSlog] = React.useState("");
  const [dodatniKontekst, setDodatniKontekst] = React.useState("");

  const [odpriModal, setOdpriModal] = useState(false);
  const [vsebinaModal, setVsebinaModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [odgovorPrejet, setOdgovorPrejet] = useState(false);
  const user = getAuth();
  const userId = user.currentUser.uid;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datumRojstva;
    setShowDatePicker(Platform.OS === "ios");
    setDatumRojstva(currentDate);
  };

  const resetInputs = () => {
    setAlergije("");
    setBolezniDruzine("");
    setZdravila("");
    setSimptomi("");
    setZivljenjskiSlog("");
    setDodatniKontekst("");
  };

  const handleSubmit = async () => {
    if (simptomi.trim().length === 0) {
      Alert.alert("Nujno vpišite še opis simptomov!");
      return;
    }

    const data = {
      datum_rojstva: datumRojstva.toLocaleDateString(),
      spol: spol === "Moški" ? true : false,
      opis_simptomov: simptomi,
      alergije: alergije,
      bolezni_v_druzini: bolezniDruzine,
      zdravila: zdravila,
      zivljenjski_slog: zivljenjskiSlog,
      dodatni_kontekst: dodatniKontekst,
    };

    try {
      setOdgovorPrejet(false);
      setLoading(true);
      setOdpriModal(true);
      //console.log(userId);

      const response = await api.post(`/chatGPT/${userId}`, data);
      //console.log(response.data.odgovor.odgovor);
      const odgovorIzpis = response.data.odgovor.odgovor;
      setVsebinaModal(odgovorIzpis);
      dodaj();
      setOdgovorPrejet(true);
    } catch (error) {
      console.error("Napaka:", error);
    } finally {
      setLoading(false);
      resetInputs();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Osnovni podatki pacienta:</Text>

      <TouchableOpacity
        style={styles.datePickerInput}
        onPress={() => setShowDatePicker(true)}
      >
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

      <RadioButton.Group
        onValueChange={(newValue) => setSpol(newValue)}
        value={spol}
      >
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <RadioButton
              value="Moški"
              color={spol === "Moški" ? "#18ada5" : "grey"}
              uncheckedColor="grey"
            />
            <Text>Moški</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="Ženska"
              color={spol === "Ženska" ? "#18ada5" : "grey"}
              uncheckedColor="grey"
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Pošlji zahtevek</Text>
      </TouchableOpacity>

      <Modal visible={odpriModal} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {loading && !odgovorPrejet ? (
              <View style={[styles.container, styles.horizontal]}>
                <Image
                  source={require("../img/eZdravnik_logo.png")}
                  style={styles.logo}
                />
                <ActivityIndicator size={160} style={styles.spinner} />
                <Text style={styles.loadingText}>
                  <Typewriter
                    typing={1}
                    minDelay={30}
                    maxDelay={40}
                    style={styles.typewriterText}
                  >
                    <Text style={{ color: '#18ada5' }}>e</Text>Zdravnik generira odgovor...
                  </Typewriter></Text>
              </View>
            ) : (
              <Text style={styles.modalText}>{vsebinaModal}</Text>
            )}
            {odgovorPrejet && (
              <TouchableOpacity
                style={styles.modalButtonZapri}
                onPress={() => setOdpriModal(false)}
              >
                <Text style={styles.modalButtonText}>Zapri</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginTop: -203,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50, // RAZMIK OD VRHA
    paddingBottom: 20, // RAZMIK DNO
    paddingHorizontal: 10, // RAZMIK STRANI
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
  datePickerInput: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 5,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: "80%",
    borderRadius: 5,
    textAlignVertical: "center", //ZA ANDROID
    paddingTop: Platform.OS === "ios" ? 10 : 0, // ZA IOS
    paddingBottom: Platform.OS === "ios" ? 10 : 0, // ZA IOS
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40, // PROSTOR MED RADIO GUMBI
  },
  button: {
    backgroundColor: "#18ada5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    width: "50%",
    marginTop: 20,
    marginBottom: 100,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    margin: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "justify",
    lineHeight: 25,
  },
  modalButtonZapri: {
    backgroundColor: "#18ada5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  containerSpinner: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalSpinner: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginBottom: 50,
  },
  loadingText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 25,
  },
  logo: {
    marginTop: -30,
    width: 220,
    height: 220,
    alignSelf: "center",
    resizeMode: "contain",
    justifyContent: "center",
  },
});
