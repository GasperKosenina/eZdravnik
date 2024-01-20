import * as React from 'react';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

export default function Zgodovina({ odgovori }) {
    //console.log(odgovori)
    useEffect(() => {
    }, [odgovori]);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginTop: 20 }}>
                {odgovori.map((odgovor, index) => (
                    <Text key={index}>{odgovor.id}</Text>
                ))}
            </View>
        </View>
    );
}