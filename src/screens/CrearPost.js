import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import Logo from '../../assets/icon.png';
import Icon from 'react-native-vector-icons/Feather';
import pensandoElPost from '../../assets/probando.gif';

class CrearPost extends Component {
    constructor() {
        super();
        this.state = {
            textoPost: ''
        };
    }

    // 1) Completar la creación de posts
    crearPost(owner, textoPost, createdAt) {
        // Crear la colección posts, y si existe, agregar los datos.
        db.collection('posts')
            .add({
                owner: owner, //auth.currentUser.email,
                textoPost: textoPost, //this.state.textoPost,
                createdAt: createdAt //Date.now(),
            })
            .then(res =>   this.props.navigation.navigate('Home'))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={30} color="#1DA1F2" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Crear Post</Text>
                </View>
                <Text style={styles.userInfo}>Dueño del Post: {auth.currentUser.email}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ textoPost: text })}
                    placeholder="¿Qué estás pensando?"
                    multiline={true}
                    value={this.state.textoPost}
                />
                <TouchableOpacity style={styles.postButton} onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.buttonText}>Publicar</Text>
                </TouchableOpacity>
                <Image
                    source={pensandoElPost}
                    style={styles.avatar}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    avatar: {
        alignSelf: 'center',
        verticalAlign: 'end',
        width: 500, // Ajusta el ancho de la imagen según tus necesidades
        height: 500, // Ajusta la altura de la imagen según tus necesidades
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    userInfo: {
        marginVertical: 20,
        fontSize: 16,
    },
    textInput: {
        height: 120,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    postButton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CrearPost;
