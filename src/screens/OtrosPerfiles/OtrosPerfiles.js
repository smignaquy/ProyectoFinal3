import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import Header from '../../components/Header/Header';
import { ActivityIndicator } from "react-native-web";
import foto from '../../../assets/bauti.jpg';
import Post from '../../components/Post/Post'

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            posteos: [],
            mostrarBio: false
        }
    }

    componentDidMount() {
        // traigo datos del usuario
        db.collection('users').where("owner", "==", this.props.route.params.owner).onSnapshot(
            docs => {
                let users = []
                docs.forEach(doc => {
                    users.push(doc.data())
                })

                this.setState({
                    usuarios: users,
                })
            }
        )

        //traigo posteos
        db.collection('posts').where("owner", "==", this.props.route.params.owner).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()})
                })
                console.log(posts)
                this.setState({
                    posteos: posts,
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.logo} navigate={this.props.navigation.navigate}/>
                {this.state.usuarios.length > 0 ? (
                    <View style={styles.profileContainer}>
                        <Text style={styles.title}>{this.state.usuarios[0].userName}</Text>
                        <Image
                            source={foto}
                            style={styles.avatar}
                        />
                        <View style={styles.lineaAzul}></View>
                        <Text style={styles.username}>{this.state.usuarios[0].owner}</Text>
                        {this.state.usuarios[0].bio === '' || !this.state.usuarios[0].bio ? (
                            <Text style={styles.bio}>No tiene biografía.</Text>
                        ) : (this.state.usuarios[0].bio.length > 200 ? (
                                <View>
                                    {this.state.mostrarBio ? (
                                        <Text style={styles.bio}>{this.state.usuarios[0].bio}</Text>
                                    ) : (
                                        <Text style={styles.bio}>{this.state.usuarios[0].bio.substring(0, 200)}</Text>
                                    )}
                                    <TouchableOpacity onPress={() => this.setState({ mostrarBio: !this.state.mostrarBio })}>
                                        <Text style={styles.verComentario}>
                                            {this.state.mostrarBio ? 'Ver menos' : 'Ver más'}
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            ) : (
                            <Text style={styles.bio}>{this.state.usuarios[0].bio}</Text>
                            ))
                        }
                    <TouchableOpacity style={styles.editarPerfilBoton}>
                            <Text style={styles.editarPerfilText}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <Text style={styles.bio}>Cantidad de posts: {this.state.posteos.length}</Text>
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='#1DA1F2' />
                    </View>
                )}
                {this.state.posteos.length <= 0 ? (
                    <Text>Este usuario no tiene posteos</Text>
                ) : (
                    <FlatList 
                        style={styles.flatlist}
                        data= {this.state.posteos}
                        keyExtractor={ doc => doc.createdAt}
                        renderItem={ ({item}) => <Post infoPost={item} navigate={this.props.navigation.navigate}/> }
                    />
                )}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    verComentario: {
        color: '#1DA1F2',
        fontWeight: 'bold',
        flex: 1,
        alignSelf: 'center',
        paddingBottom: 10
    },
    profileContainer: {
        alignItems: 'center',
    },
    editarPerfilBoton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    editarPerfilText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    lineaAzul: {
        height: 1,
        alignSelf: 'center',
        margin: 15,
        width: 250,
        backgroundColor: '#1DA1F2', 
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
        borderColor: 'black'
    },
    username: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
    },
    bio: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        paddingBottom: 150,
    },
});

export default MiPerfil;