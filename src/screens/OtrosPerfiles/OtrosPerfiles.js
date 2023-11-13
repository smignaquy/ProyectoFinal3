import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import Header from '../../components/Header/Header';
import { ActivityIndicator } from "react-native-web";
import foto from '../../../assets/bauti.jpg';

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: []
        }
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot(
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
    }
        render() {
            // Obtén el valor de 'owner' de los parámetros de la ruta
            const owner = this.props.route.params.owner;
        
            return (
              <View>
                  <Header> 
                <Header style={styles.logo} navigate={this.props.navigation.navigate}/></Header>
                <Text>Perfil de {owner}</Text>
                
                {/* Resto del contenido de la pantalla 'OtrosPerfiles' */}
              </View>
            );
          }
        }

        // console.log(this.state.usuarios);
        // return (
        //     <View style={styles.container}>
        //         <Header style={styles.logo} navigate={this.props.navigation.navigate}/>
        //         <Text>Estos son perfiles de otros usuaios</Text>

                {/* {this.state.usuarios.length > 0 ? (
                    <View style={styles.profileContainer}>
                        <Text style={styles.title}>{this.state.usuarios[0].userName}</Text>
                        <Image
                            source={foto}
                            style={styles.avatar}
                        />
                        <View style={styles.lineaAzul}></View>
                        <Text style={styles.username}>{this.state.usuarios[0].owner}</Text>
                        {this.state.usuarios[0].bio === '' || !this.state.usuarios[0].bio ?
                            <Text style={styles.bio}>No tiene biografía.</Text>
                        :
                            <Text style={styles.bio}>{this.state.usuarios[0].bio}</Text>
                        }
                    <TouchableOpacity style={styles.editarPerfilBoton}>
                            <Text style={styles.editarPerfilText}>Editar Perfil</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='#1DA1F2' />
                    </View>
                )} */}
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    profileContainer: {
        alignItems: 'center',
    },
    editarPerfilBoton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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