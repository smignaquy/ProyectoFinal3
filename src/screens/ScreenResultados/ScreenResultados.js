import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import Header from '../../components/Header/Header';
import foto from '../../../assets/bauti.jpg';

class ScreenResultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            datos: false
        };
    }

    componentDidMount() {
        let textoBuscado = this.props.route.params.textoBuscado.toLowerCase()
        console.log('didmount', textoBuscado)
        db.collection('users').onSnapshot(
            docs => {
                let users = []
                docs.forEach(doc => {
                    let data = doc.data()
                    if(data.owner.toLowerCase().includes(textoBuscado)){
                        console.log('entra al primer if', doc.data())
                        users.push(doc.data())
                    } else if(data.userName.toLowerCase().includes(textoBuscado)){
                        console.log('entra al segundo if', doc.data())
                        users.push(doc.data())
                    }
                })

                this.setState({
                    usuarios: users,
                    datos: true
                })
            }
        )
    }

    render() {
        let textoBuscado = this.props.route.params.textoBuscado
        console.log(this.state.usuarios)
        return (
                
                <View style={styles.formContainer}>
                    <Header style={styles.logo} navigate={this.props.navigation.navigate}/>
                    {this.state.datos == false ? <ActivityIndicator size='large' color='blue' />
                    : 
                        this.state.usuarios.length === 0 ?  <Text>No hay resultados para la bsuqueda: {textoBuscado}</Text>
                            :
                                <View style={styles.container}>
                                    <Text>Estos son tus resultados de busqueda de: {textoBuscado}</Text>
                                    <View style={styles.lineaAzul}></View>
                                    <FlatList 
                                        style={styles.flatlist}
                                        data= {this.state.usuarios}
                                        keyExtractor={ doc => doc.createdAt }
                                        renderItem={ ({item}) => 
                                        <TouchableOpacity style={styles.mailContainer} onPress={() => {this.props.navigation.navigate('OtrosPerfiles', {owner: item.owner})}} >
                                            <Text style={styles.postUsario}>{item.owner}</Text>
                                            <Text>{item.userName}</Text>
                                            {this.state.usuarios[0].fotoPerfil == '' ? (
                                                <Image
                                                    source={foto}
                                                    style={styles.avatar}
                                                />
                                            ) : (
                                                <Image
                                                    source={item.fotoPerfil}
                                                    style={styles.avatar}
                                                />
                                            )}
                                        </TouchableOpacity>
                                        
                                    }
                                    />
                                </ View>
                    }
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
        borderBlockColor: '#1DA1F2',
        alignItems: 'center',
    },
    postUsario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DA1F2',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    // logo: {
    //     flex: 1,
    //     paddingBottom: 150,
    // },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 10,
    },
    flatlist: {
        width: 350, 
        marginBottom: 30,
    },
    lineaAzul: {
        height: 1,
        alignSelf: 'center',
        margin: 15,
        width: '100%',
        backgroundColor: '#1DA1F2', // Color azul
        marginTop: 20,
        marginBottom: 20,
    },
    mailContainer: {
        alignItems: 'center',
        borderColor: '#1DA1F2',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        border: '1px solid #e1e8ed',
        marginBottom: 10,
    }
});

export default ScreenResultados;