import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput, Button, ActivityIndicator } from 'react-native-paper'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { StyleSheet } from 'react-native'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from 'react-native'
import api from '../../services/api';


const Prijava = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSignInMode, setIsSignInMode] = useState(true)
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
            alert('Prijava ni uspela!')
        } finally {
            setLoading(false)
        }
    }

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const user = {
                email: response.user.email,
                uid: response.user.uid
            }
            console.log(user)
            await api.post('/uporabniki', body = user)
        } catch (error) {
            console.log(error)
            alert('Registracija ni uspela!')
        } finally {
            setLoading(false)
        }
    }

    const toggleMode = () => {
        setEmail('');
        setPassword('');
        setIsSignInMode(!isSignInMode);
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    style={styles.input}
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    label='Geslo'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {loading ? (
                    <ActivityIndicator size='large' color='#18ada5' />
                ) : (
                    <>
                        <Button
                            mode="contained"
                            onPress={isSignInMode ? signIn : signUp}
                            style={styles.button}
                        >
                            {isSignInMode ? 'Prijava' : 'Registracija'}
                        </Button>
                        {isSignInMode ? (
                            <TouchableOpacity onPress={toggleMode}>
                                <Text style={styles.toggleText}>Še nimate računa?</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={toggleMode}>
                                <Text style={styles.toggleText}>Vrni se na Prijavo</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Prijava

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#18ada5',
        borderRadius: 5,
        paddingVertical: 10,
    },
    toggleText: {
        marginTop: 15,
        color: '#18ada5',
        textAlign: 'center'
    }
})