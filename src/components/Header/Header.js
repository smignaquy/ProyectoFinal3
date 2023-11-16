import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoBuscador: '' // Agregué el estado inicial para textoBuscador
        }
    }

    buscar(email) {
        console.log('textoBuscador:', this.state.textoBuscador)
        console.log('email:', email)
        console.log('props:', this.props)
        this.props.navigate('Resultados', { textoBuscado: email }, {navigate : this.props.navigate })
        this.setState({
            textoBuscador: ''
        })
        // filtrar lo del input con el array de usuarios
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigate('Home')}>
                    <Image
                        source={require('../../../assets/icon.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => {this.setState({ textoBuscador: text })}}
                        placeholder="Buscar usuarios.."
                        multiline={true}
                        value={this.state.textoBuscador}
                    />
                    <TouchableOpacity onPress={() => this.buscar(this.state.textoBuscador)}>
                        <Ionicons name="search-circle" size={50} color="#1DA1F2" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center', // Alinea los elementos verticalmente al centro
        justifyContent: 'space-between', // Distribuye los elementos a lo largo del contenedor
    },
    logo: {
        width: 50,
        height: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Alinea los elementos verticalmente al centro
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
        width: 200,
    },
});

export default Header;
