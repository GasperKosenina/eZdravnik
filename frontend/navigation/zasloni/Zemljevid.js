import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Modal,
} from "react-native";

//BOLNICE
const initialBolnice = [
  {
    id: 1,
    ime: "Bolnišnica Sežana",
    naslov: "Cankarjeva ulica 4, 6210 Sežana",
    telefon: "05 707 40 00",
    faks: "05 707 40 19",
    spletnaStran: "www.bolnisnica-sezana.si",
  },
  {
    id: 2,
    ime: "Splošna bolnišnica Slovenj Gradec",
    naslov: "Gosposvetska cesta 1, 2380 Slovenj Gradec",
    telefon: "02 88 23 400",
    faks: "02 88 42 393",
    spletnaStran: "www.sb-sg.si",
  },
  {
    id: 3,
    ime: "Splošna bolnišnica Brežice",
    naslov: "Černelčeva cesta 15, 8250 Brežice",
    telefon: "07 466 81 00",
    faks: "07 466 81 10",
    spletnaStran: "www.sb-brezice.si",
  },
  {
    id: 4,
    ime: "Splošna bolnišnica Celje",
    naslov: "Oblakova ulica 5, 3000 Celje",
    telefon: "03 423 30 00",
    faks: "03 423 36 66",
    spletnaStran: "www.sb-celje.si",
  },
  {
    id: 5,
    ime: "Univerzitetni klinični center Maribor",
    naslov: "Ljubljanska ulica 5, 2000 Maribor",
    telefon: "02 32 11 000",
    faks: "02 33 12 393",
    spletnaStran: "www.ukc-mb.si",
  },
  {
    id: 6,
    ime: "Univerzitetni klinični center Ljubljana",
    naslov: "Zaloška cesta 2, 1000 Ljubljana",
    telefon: "01 522 50 50",
    faks: "01 522 24 82",
    spletnaStran: "www.ukclj.si",
  },
  {
    id: 7,
    ime: "Splošna bolnišnica Jesenice",
    naslov: "Cesta maršala Tita 112, 4270 Jesenice",
    telefon: "04 586 83 77",
    faks: "04 586 84 01",
    spletnaStran: "www.sb-je.si",
  },
  {
    id: 8,
    ime: "Splošna bolnišnica dr. Jožeta Potrča Ptuj",
    naslov: "Potrčeva cesta 23-25, 2250 Ptuj",
    telefon: "02 749 14 00",
    faks: "02 749 16 30",
    spletnaStran: "www.sb-ptuj.si",
  },
  {
    id: 9,
    ime: "Splošna bolnišnica Murska Sobota",
    naslov: "Ulica dr. Vrbnjaka 6, 9000 Murska Sobota",
    telefon: "02 512 33 97",
    faks: "02 521 10 07",
    spletnaStran: "www.sb-ms.si",
  },
  {
    id: 10,
    ime: "Bolnišnica Golnik",
    naslov: "Golnik 36, 4204 Golnik",
    telefon: "04 25 69 100",
    faks: "04 25 69 117",
    spletnaStran: "www.klinika-golnik.si",
  },
  {
    id: 11,
    ime: "Splošna bolnišnica Izola",
    naslov: "Polje 40, 6310 Izola",
    telefon: "05 660 60 00",
    faks: "05 660 62 15",
    spletnaStran: "www.sb-izola.si",
  },
  {
    id: 12,
    ime: "Splošna bolnišnica Nova Gorica",
    naslov: "Rejčeva ulica 4, 5000 Nova Gorica",
    telefon: "05 330 11 11",
    faks: "05 330 14 30",
    spletnaStran: "www.sb-ng.si",
  },
  {
    id: 13,
    ime: "Splošna bolnišnica Novo Mesto",
    naslov: "Šmihelska cesta 1, 8000 Novo Mesto",
    telefon: "07 39 16 100",
    faks: "07 39 16 197",
    spletnaStran: "www.sb-nm.si",
  },
  {
    id: 14,
    ime: "Bolnišnica za ginekologijo in porodništvo Kranj",
    naslov: "Kidričeva cesta 38a, 4000 Kranj",
    telefon: "04 208 40 00",
    faks: "04 208 40 10",
    spletnaStran: "www.bolnisnica-kranj.si",
  },
  {
    id: 15,
    ime: "Bolnišnica Metlika",
    naslov: "Cesta bratstva in enotnosti 28, 8330 Metlika",
    telefon: "07 36 83 100",
    faks: "07 36 83 150",
    spletnaStran: "www.bolnisnica-metlika.si",
  },
  {
    id: 16,
    ime: "Bolnišnica Ptuj",
    naslov: "Potrčeva cesta 23, 2250 Ptuj",
    telefon: "02 749 14 00",
    faks: "02 749 16 30",
    spletnaStran: "www.sb-ptuj.si",
  },
  {
    id: 17,
    ime: "Psihiatrična bolnišnica Begunje",
    naslov: "Begunje na Gorenjskem 55, 4275 Begunje na Gorenjskem",
    telefon: "04 53 51 200",
    faks: "04 53 51 215",
    spletnaStran: "www.pb-b.si",
  },
  {
    id: 18,
    ime: "Psihiatrična bolnišnica Idrija",
    naslov: "Pot sv. Antona 49, 5280 Idrija",
    telefon: "05 37 34 200",
    faks: "05 37 34 210",
    spletnaStran: "www.pb-idrija.si",
  },
  {
    id: 19,
    ime: "Psihiatrična bolnišnica Ormož",
    naslov: "Ptujska cesta 33, 2270 Ormož",
    telefon: "02 741 51 00",
    faks: "02 741 51 10",
    spletnaStran: "www.pb-ormoz.si",
  },
  {
    id: 20,
    ime: "Thalassotherapia Crikvenica",
    naslov: "Gajevo šetalište 21, 51260 Crikvenica, Hrvaška",
    telefon: "+385 51 408 500",
    faks: "+385 51 241 561",
    spletnaStran: "www.thalassotherapia-crikvenica.hr",
  },
  {
    id: 21,
    ime: "Bolnišnica za pljučne bolezni in tuberkulozo Golnik",
    naslov: "Golnik 36, 4204 Golnik",
    telefon: "04 25 69 100",
    faks: "04 25 69 117",
    spletnaStran: "www.klinika-golnik.si",
  },
  {
    id: 22,
    ime: "Zdravstveni dom Ptuj",
    naslov: "Potrčeva cesta 19a, 2250 Ptuj",
    telefon: "02 749 31 00",
    faks: "02 749 31 10",
    spletnaStran: "www.zd-ptuj.si",
  },
];

export default function Zemljevid() {
  const [bolnice, setBolnice] = useState(initialBolnice);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBolnica, setSelectedBolnica] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredBolnice = initialBolnice.filter((bolnica) =>
      bolnica.ime.toLowerCase().includes(text.toLowerCase()),
    );
    setBolnice(filteredBolnice);
  };

  const showBolnicaDetails = (bolnica) => {
    setSelectedBolnica(bolnica);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="#18ada5"
        onPress={() => showBolnicaDetails(item)}
        style={styles.bolnicaContainer}
      >
        <Text style={styles.bolnicaIme}>{item.ime}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Iskanje bolnic po imenu"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={bolnice}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedBolnica?.ime}</Text>
            <Text style={styles.modalText}>
              Naslov: {selectedBolnica?.naslov}
            </Text>
            <Text style={styles.modalText}>
              Telefon: {selectedBolnica?.telefon}
            </Text>
            <Text style={styles.modalText}>Faks: {selectedBolnica?.faks}</Text>
            <Text style={styles.modalText}>
              Spletna stran: {selectedBolnica?.spletnaStran}
            </Text>

            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              underlayColor="#17b292"
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Zapri</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  bolnicaContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
  },
  bolnicaIme: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    width: "80%",
    height: "55%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    color: "#18ada5",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 21,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#18ada5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
