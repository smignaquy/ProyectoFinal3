import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import Logo from '../../../assets/icon.png';



class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            userName: '',
            password: '',
            bio: '',
            error:''
        }
    }

    createUser(email, pass, userName, bio, fdp) {
        if (this.state.email === ''){
            this.setState({
                email:'Este campo es obligatorio!'
            })
        } else if (this.state.userName === ''){
            this.setState({
                userName:'Este campo es obligatorio!'
            })
        } else if (this.state.password === ''){
            this.setState({
                password:'Este campo es obligatorio!'
            })
        } else {
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
                    bio : bio 
                })

                this.setState({
                    email: 'Correo electrónico (obligatorio)',
                    userName: 'Nombre de usuario (obligatorio)',
                    password: 'Contraseña (obligatorio)',
                    bio: "Cuentame de tí (no obligatorio)"
                })

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
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder= 'Correo electrónico (obligatorio)'
                    keyboardType='email-address'
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ userName: text })}
                    placeholder= 'Nombre de usuario (obligatorio)'
                    keyboardType='default'
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder= 'Contraseña (obligatorio)'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.bio}
                    onChangeText={(text) => this.setState({ bio: text })}
                    placeholder= "Cuentame de tí (no obligatorio)"
                    multiline={true}
                    value={this.state.textoPost}
                />
                {/* <TextInput
                    style={styles.bio}
                    onChangeText={(text) => this.setState({ bio: text })}
                    placeholder="Foto de perfil (no obligatorio)"
                    multiline={true}
                    value={this.state.textoPost} */}
                {/* /> */}
                <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={() => {
        // Lógica para permitir al usuario seleccionar una imagen de la galería
        // Puedes utilizar bibliotecas como react-native-image-picker para implementar esta funcionalidad.
        // Asegúrate de instalar la biblioteca con: npm install react-native-image-picker
    }}
                >
                    <Text style={styles.imagePickerButtonText}>Seleccionar Foto de Perfil</Text>
                </TouchableOpacity>
                <Text styles={styles.error}>{this.state.error}</Text>

            {/* QUEDA LA CAMARA PARA LA IMAGEN DE USUARIO */}

                <TouchableOpacity style={styles.button} onPress={() => this.createUser(this.state.email, this.state.password, this.state.userName, this.state.bio)}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.registerText}>¿Ya tengo cuenta? Ir al inicio de sesión.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        alignSelf: 'center',
        width: 50, 
        height: 50, 
        marginBottom: 10,
    },
    bio: {
        height: 120,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
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
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerText: {
        marginTop: 20,
        color: '#1DA1F2',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        height: 10,
    }
})

export default Register;
