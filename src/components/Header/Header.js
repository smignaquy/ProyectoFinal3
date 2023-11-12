import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Buscador from '../Buscacdor/Buscador';
//import Logo from '../../assets/icon.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.dataNavigation.navigate('Menu')}>
                    <Image
                        source={require('../../../assets/icon.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                < Buscador style={styles.fromBuscador}/>
                {/* <TouchableOpacity onPress={() => this.props.dataNavigation.navigate('Perfil')>
                    <Text>Mi perfil</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}
export default Header;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    logo: {
        alignSelf: 'center',
        width: 50, // Ajusta el ancho de la imagen según tus necesidades
        height: 50, // Ajusta la altura de la imagen según tus necesidades
        marginBottom: 5,
    },
    fromBuscador: {
        alignSelf: 'right',  
    }
});

