import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import Logo from '../../../assets/icon.png';
import Icon from 'react-native-vector-icons/Feather';
import pensandoElPost from '../../../assets/probando.gif';
import Header from '../../components/Header/Header';
import MyCamera from "../../components/My-Camera/My-Camera";
// import Menu from './src/components/Menu/Menu';


class CrearPost extends Component {
    constructor() {
        super();
        this.state = {
            textoPost: '',
            placeInput:'¿Qué estás pensando?',
            fotoUrl:'',
            publicar: true
        };
    }

    cambioEstadoPublicar(value){
        this.setState({publicar:value})
    }



    // 1) Completar la creación de posts
    crearPost(owner, textoPost, createdAt, fotoUrl) {
        if(textoPost == ''){
            this.setState({
                placeInput: 'El texto no puede estar vacio!'
            })
        } else {
        // Crear la colección posts, y si existe, agregar los datos.
            db.collection('posts')
            .add({
                owner: owner, //auth.currentUser.email,
                textoPost: textoPost, //this.state.textoPost,
                photo: this.state.fotoUrl ,
                createdAt: createdAt, //Date.now()
            })
            .then(res =>   {
                this.setState({
                    textoPost: '',
                    placeInput:'¿Qué estás pensando?'
                })
                this.props.navigation.navigate('Home')
            })
            .catch(e => console.log(e));
    }}

        traerUrlDeFoto(url){
            this.setState({
                fotoUrl:url
            })
            console.log('url: ', this.state.fotoUrl)
        }

    
    render() {
        return (
            <ScrollView style={styles.formContainer}>
                <Header navigate={this.props.navigation.navigate} style={styles.logo} />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={30} color="#1DA1F2" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Crear Post</Text>
                </View>
                <Text style={styles.userInfo}>Dueño del Post: {auth.currentUser.email}</Text>
                <View style={styles.containerPhoto}>
                    <MyCamera style={styles.photo} cambioEstadoPublicar={(value)=> this.cambioEstadoPublicar(value)} traerUrlDeFoto={(url)=>this.traerUrlDeFoto(url)} stylss={styles.botonFoto}/>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ textoPost: text })}
                    placeholder= {this.state.placeInput}
                    multiline={true}
                    value={this.state.textoPost}
                />
                {this.state.publicar && 
                <TouchableOpacity style={styles.postButton} onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.buttonText}>Publicar</Text>
                </TouchableOpacity>
    }
                <Image
                    source={pensandoElPost}
                    style={styles.avatar}
                />
            </ScrollView>
            
            
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    containerPhoto: {
        alignSelf: 'center'
    },
    photo: {
        width: 500,
        height: 500,
    },
    avatar: {
        alignSelf: 'center',
        verticalAlign: 'end',
        width: 300, // Ajusta el ancho de la imagen según tus necesidades
        height: 300, // Ajusta la altura de la imagen según tus necesidades
        marginBottom: 10,
    },
    header: {
        paddingTop: 15,
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
        height: 150,
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
    logo: {
        flex: 1
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CrearPost;


