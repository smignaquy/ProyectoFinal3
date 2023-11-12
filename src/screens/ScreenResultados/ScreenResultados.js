import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';


class CrearPost extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Estos son tus resultados de busqueda</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
});

export default CrearPost;