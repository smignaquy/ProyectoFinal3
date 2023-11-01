import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import Logo from '../../assets/icon.png';

class CrearPost extends Component {
    constructor() {
        super()
        this.state = {
            textoPost: ''
        }
    }

    //1)Completar la creación de posts
    crearPost(owner, textoPost, createdAt){
        //Crear la colección posts, y si existe, agregar los datos.
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            createdAt: createdAt //Date.now(), 
        })
        .then( res => console.log('Post publicado/subido a labase'))
        .catch( e => console.log(e))
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}>Crear Post</Text>
                <Text style={styles.title}>Dueño del Post : {auth.currentUser.email}</Text>
                <TextInput
                    style={styles.inputPost}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    multiline={true}
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.textButton}>Publicar Post</Text>
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
    inputPost: {
        height: 80,
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
})

export default CrearPost