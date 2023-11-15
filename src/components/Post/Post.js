import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity , TextInput , Image} from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Feather';
import foto from '../../../assets/bauti.jpg';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            mostrarInputComentario: false,
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

    comentar() {
        this.setState({ mostrarInputComentario: true })
        this.setState({ comentario: '' })
        db.collection('posts').doc(this.props.infoPost.id).update({
            comentario: firebase.firestore.FieldValue.arrayUnion({ owner: auth.currentUser.email, textoComentario: this.state.comentario, autor: auth.currentUser.email, createdAt: Date.now() })
        })
        .then(this.setState({ comment: '' }))
        .catch(e => console.log('Error' + e))
    }


    render() {
        console.log(this.props.infoPost);
        return (
            <View style={styles.postContainer}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.fotoUsuario} onPress={() => {this.props.navigate('OtrosPerfiles', {owner: this.props.infoPost.data.owner})}}>
                        <Image
                            source={foto}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.navigate('OtrosPerfiles', {owner: this.props.infoPost.data.owner})}}>
                        <Text style={styles.postUsario}>{this.props.infoPost.data.owner}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.postText}>{this.props.infoPost.data.textoPost}</Text>
                <View style={styles.interactionContainer}>
                    {/* {this.props.showButton && ( */}
                        {this.state.mostrarInputComentario ? (
                            
                            <TouchableOpacity style={styles.comentarBoton} onPress={() => this.comentar()}>
                                <Text style={styles.comentarText}>Publicar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.comentarBoton} onPress={() => this.setState({ mostrarInputComentario: true })}>
                                <Text style={styles.comentarText}>Comentar</Text>
                            </TouchableOpacity>
                        )}
                    {/* )} */}
                    {/* IRIA HASTA ACA } */}
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
                {/* {this.props.showButton && ( */}
                    <View>
                        {this.state.mostrarInputComentario ? (
                        <View style={styles.comentario}>
                            <TextInput
                            style={styles.inputComentario}
                            placeholder="Escribe tu comentario"
                            value={this.state.comentario}
                            onChangeText={(text) => this.setState({ comentario: text })}
                            />
                        </View>
                        ) : (
                        <Text></Text>
                        )}
                        {!this.props.infoPost.data.comentario ? (
                        <Text style={styles.verComentario}>No hay comentarios</Text>
                        ) : (
                        <TouchableOpacity onPress={() => this.props.navigate('MostrarComentarios', { infoPost: this.props.infoPost })}>
                            <Text style={styles.verComentario}>Ver comentarios</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                {/* )} */}

                {/* IRIA TAMBIEN HASTA ACA } */}
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
        border: '1px solid #e1e8ed', 
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      fotoUsuario: {
        marginRight: 10, 
      },
      postUsario: {
        fontSize: 16,
      },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 60,
        marginVertical: 20,
        borderColor: 'black'
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

export default Post;
