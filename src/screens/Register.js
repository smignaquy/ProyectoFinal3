import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            userName: '',
            password: ''
        }
    }
    componentDidMount() {
        console.log('Chequear si el usuario está logueado en Firebase.');
    }

    createUser(email, pass, userName) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                // Cuando Firebase responde sin error
                console.log('Registrado ok', response);

                // Cambiar los estados a vacío como están al inicio.

                // Crear la colección Users
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    createdAt: Date.now(),
                })
                    .then()
                    .catch(e => console.log(e))
            })
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Text>Registro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ userName: text })}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.createUser(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Ya tengo cuenta. Ir al login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#28a745', // Fondo de color verde
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    textButton: {
        color: 'white', // Texto en color blanco
        textAlign: 'center', // Centrar el texto
        fontWeight: 'bold', // Texto en negritas
    }
})

export default Register;
