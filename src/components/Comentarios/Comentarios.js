import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity , TextInput } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Feather';

class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            comentario: '',
        }
    }

    componentDidMount() {
        // Verificar si el post ya está likeado o no.
        const likes = this.props.infoPost.data.likes || [];
        if (likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true,
                cantidadDeLikes: likes.length,
            });
        } else {
            this.setState({
                cantidadDeLikes: likes.length,
            });
        }
    }

    likear() {
        // Update en la base de datos
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => {
                this.setState((prevState) => ({
                    like: true,
                    cantidadDeLikes: prevState.cantidadDeLikes + 1,
                }));
            })
            .catch(e => console.log(e))
    }

    unLike() {
        // Quitar del array de likes al usuario que está mirando el post.
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(res => {
                this.setState((prevState) => ({
                    like: false,
                    cantidadDeLikes: prevState.cantidadDeLikes - 1,
                }));
            })
            .catch(e => console.log(e))
    }


    render() {
        console.log(this.props.infoPost.data.comentario[0].autor);
        return (
            <View style={styles.postContainer}>
                <TouchableOpacity onPress={() => {this.props.navigate('OtrosPerfiles', {owner: this.props.infoPost.data.comentario[0].autor})}}>
                    <Text style={styles.postUsario}>{this.props.infoPost.data.comentario[0].autor}</Text>
                </TouchableOpacity>
                <Text style={styles.postText}>{this.props.infoPost.data.comentario[0].textoComentario}</Text>
                    <View style={styles.likesContainer}>
                        {this.state.like ?
                            <TouchableOpacity onPress={() => this.unLike()}>
                                <Icon name="heart" size={30} color="red" style={styles.icon} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.likear()}>
                                <Icon name="heart" size={30} color="#1DA1F2" style={styles.icon} />
                            </TouchableOpacity>
                        }
                        <Text style={styles.contador}>{this.state.cantidadDeLikes}</Text>
                    </View>                
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
    }
});

export default Comentarios;
