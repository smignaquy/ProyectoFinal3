import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.
                this.setState({
                    email: '',
                    password: ''
                })

                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Home')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                console.log(error);
            })
    }

    

    render() {
        return (
            <View style={styles.formContainer}>
                <Text>Logueate</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.passowrd)}>
                    <Text style={styles.textButton}>Loguearse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                    <Text>Sino estas logueado. Regístrate</Text>
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

export default Login;
