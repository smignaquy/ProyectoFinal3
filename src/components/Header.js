import React, { Component } from "react";
import { StyleSheet, View, Image } from 'react-native';
//import Logo from '../../assets/icon.png';

class Header extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.logo}
                />
            </View>
        )
    }
}

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
});

export default Header;