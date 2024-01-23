import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Card } from 'react-native-paper';

export default function Zgodovina({ odgovori }) {
    useEffect(() => {
        return () => { };
    }, [odgovori]);

    return (
        <ScrollView>
            {odgovori.map((par, index) => (
                <Card key={index} style={styles.card}>
                    <Text>{`Zahtevek: ${par.zahtevek.opis_simptomov}`}</Text>
                    <Text>{`Odgovor: ${par.odgovor.odgovor}`}</Text>
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
});
