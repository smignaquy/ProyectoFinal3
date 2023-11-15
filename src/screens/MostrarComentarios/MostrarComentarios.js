import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity , TextInput } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from 'firebase';
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import Comentarios from "../../components/Comentarios/Comentarios";
import { ScrollView } from "react-native-web";

class MostrarComentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoPost : this.props.route.params.infoPost,
            textoPost: ''
        }
    }

    


    render(){
        console.log(this.props.route.params.infoPost);
        return(
            <View style={styles.formContainer}>
                <Header style={styles.logo} navigate={this.props.navigation.navigate} />
                <Text style={styles.title}>Comentario del post de {this.state.infoPost.data.owner}</Text>
                <View style={styles.containerComentario}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ textoPost: text })}
                        placeholder= '¿Qué quieres comentar?'
                        multiline={true}
                        // value={this.state.textoPost}
                    />
                    <TouchableOpacity style={styles.postButton} onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                        <Text style={styles.buttonText}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                {/* <ScrollView style={styles.postContainer}> */}
                    {/* <TouchableOpacity onPress={() => {this.props.navigate('OtrosPerfiles', {owner: this.props.infoPost.data.owner})}}>
                        <Text style={styles.postUsario}>{this.props.infoPost.data.owner}</Text>
                    </TouchableOpacity> */}
                {/* </ScrollView> */}

                <Comentarios infoPost={this.state.infoPost.data.comentario}/>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        border: '1px solid #e1e8ed', // Puedes ajustar el estilo del borde según tus preferencias
    },
    containerComentario: {
        paddingTop: 40,
    },
    postUsario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DA1F2',
    },
    textInput: {
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingTop: 40,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    logo: {
        flex: 1,
        paddingBottom: 150
    },
    comentarios: {
        paddingTop: 40
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    postUsario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DA1F2',
    },
    title: {
        paddingTop: 30,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black',
    },
    comentarBoton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    comentarText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
    },
    postText: {
        fontSize: 14,
    },
    interactionContainer: {
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contador: {
        marginLeft: 5,
        fontSize: 16,
        color: '#1DA1F2',
    },
    icon: {
        alignSelf: 'flex-end',
    },
    verComentario: {
        color: '#1DA1F2',
        fontWeight: 'bold'
    },
    comentario: {
        flex: 1,
        padding: 10,
    },
    inputComentario: {
        flex: 1,
        borderColor: '#1DA1F2',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    postButton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MostrarComentarios;

