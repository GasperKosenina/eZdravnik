import { View, Text, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
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
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            alert('Uspješno ste se prijavili!')
        } catch (error) {
            console.log(error)
            alert('Prijava ni uspela!')
        } finally {
            setLoading(false)
        }
    }

    const signUp = async () => {
        setLoading(true)
        try{
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



  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior='padding'>
      <TextInput style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}/>
      <TextInput style={styles.input} placeholder='Password' autoCapitalize='none' secureTextEntry onChangeText={(text) => setPassword(text)}/>

      { loading ? (
        <ActivityIndicator size='large' color='green' />
        ) : (
        <>
            <Button title='Prijava' onPress={signIn} />
            <Button title='Registracija' onPress={signUp} />
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
    input:{
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding : 10,
        backgroundColor: '#fff'

    }
})