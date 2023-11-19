import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { auth } from '../../firebase/config';
import Logo from '../../../assets/icon.png';
import MyCamera from "../../components/My-Camera/My-Camera";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error:'',
        }
    }

    componentDidMount(){
         //Redirigir al usuario a la home del sitio.
         auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate('Menu')
            }
            console.log(user)
        })
    }

    login(email, pass){
        if (this.state.email === ''){
            this.setState({
                error:'El campo de email es obligatorio!'
            })
        }  else if (this.state.password === ''){
            this.setState({
                error:'El campo de contraseña es obligatorio!'
            })
        } else {
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
                this.props.navigation.navigate('Menu')

            })
            .catch(e => 
                {console.log('error:',e.message), 
                this.setState({
                    error: e.message
                })
            })
        }

    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Image
                    source={Logo}
                    style={styles.avatar}
                />
                <Text style={styles.title}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Correo electrónico'
                    keyboardType='email-address'
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />

                <View style={styles.errorContainer}>
                    <Text styles={styles.error}>{this.state.error}</Text>
                </View> 

                <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Loguearse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                    <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    avatar: {
        alignSelf: 'center',
        width: 50, // Ajusta el ancho de la imagen según tus necesidades
        height: 50, // Ajusta la altura de la imagen según tus necesidades
        marginBottom: 10,
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    button: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 15,
        borderRadius: 5,
    },
    registerText: {
        marginTop: 20,
        color: '#1DA1F2',
        textAlign: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        height: 10,
    },
    errorContainer: {
        alignItems: 'center',
        marginBottom: 2,
        marginTop: 2,
    },
})

export default Login;
