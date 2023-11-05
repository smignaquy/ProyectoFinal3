import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import Logo from '../../assets/icon.png';

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
                    source={Logo}
                    style={styles.avatar}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    avatar: {
        alignSelf: 'center',
        width: 50, // Ajusta el ancho de la imagen según tus necesidades
        height: 50, // Ajusta la altura de la imagen según tus necesidades
        marginBottom: 10,
    },
});

export default Header;