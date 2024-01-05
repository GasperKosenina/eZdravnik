import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Dodajte želeno ikono

export default function Profil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/giraffe_pfp.png')} style={styles.profilePicture} />


      <Text style={styles.profileText}>@fakeime123</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Zgodovina')}
      >
        <Text style={styles.buttonText}>Tvoja Zgodovina</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="exit-outline" size={20} color="#ffffff" />
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ali ste prepričani, da želite odjaviti?</Text>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Prekliči</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonSignOut} onPress={() => {
              closeModal();
            }}>
              <Text style={styles.modalButtonText}>Odjavi se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: '#FFFFFF',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#18ada5',
    marginBottom: 20,
  },
  profileText: {
    fontSize: 27,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#18ada5',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signOutButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    backgroundColor: '#ff0000',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // MODALNO OKNO
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonCancel: {
    backgroundColor: 'gray', // PREKLIC GUMB SIV
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonSignOut: {
    backgroundColor: '#ff0000', // RDEČA BARVA GUMBA
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
