import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { db } from "../firebase/config";
import Icon from 'react-native-vector-icons/Feather';


class Post extends Component {
    constructor() {
        super();
        this.state = {
            posteos: []
        }
    }

    render() {
        console.log(this.props.infoPost);
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postUsario}>Usuario: {this.props.infoPost.data.owner}</Text>
                <Text style={styles.postText}>{this.props.infoPost.data.textoPost}</Text>
                <Icon name="heart" size={30} color="#1DA1F2" style={styles.icon}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        border: '1px solid #e1e8ed', // Puedes ajustar el estilo del borde según tus preferencias
    },
    postUsario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DA1F2',
    },
    postText: {
        fontSize: 14,
    },
    icon: {
        alignSelf: 'flex-end'
    }
});

export default Post;
