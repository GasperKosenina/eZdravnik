import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { Card } from 'react-native-paper';
import api from '../../services/api';
import { getAuth } from 'firebase/auth';

export default function Zgodovina() {
    const user = getAuth()
    const userId = user.currentUser.uid

    const [odgovori, setOdgovori] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        pridobiOdgovore();
    }, []);

    const pridobiOdgovore = async () => {
        try {
            const response = await api.get(`/odgovori/vse/${userId}`);
            setOdgovori(response.data.odgovor_zahtevek);
        } catch (error) {
            console.error('Napaka pri pridobivanju podatkov:', error);
        }
    };

    const showAnswer = (index) => {
        setSelectedAnswer(odgovori[index].odgovor.odgovor);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedAnswer(null);
        setModalVisible(false);
    };

    return (
        <ScrollView>
            {odgovori.map((par, index) => (
                <Card key={par.zahtevek.id} style={styles.card} onPress={() => showAnswer(index)}>
                    <Text>{`${par.zahtevek.opis_simptomov}`}</Text>
                </Card>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >

                <View style={styles.modalContainer}>
                    <ScrollView>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{`Odgovor: ${selectedAnswer}`}</Text>
                            <TouchableOpacity style={styles.modalButtonZapri} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Zapri</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#a0d3c1',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        margin: 20
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'justify',
        lineHeight: 25
    },
    modalButtonZapri: {
        backgroundColor: '#18ada5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
