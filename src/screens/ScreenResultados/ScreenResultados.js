import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import Header from '../../components/Header/Header';

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
        console.log('render')
        return (
            <View style={styles.container}>
                <Header style={styles.logo} navigate={this.props.navigation.navigate}/>
                {this.state.datos == false ? <ActivityIndicator size='large' color='blue' />
                : 
                    this.state.usuarios.length === 0 ?  <Text>No hay resultados para la bsuqueda {textoBuscado}</Text>
                        :
                            <View>
                                <Text>Estos son tus resultados de busqueda de {textoBuscado}</Text>
                                <FlatList 
                                    style={styles.flatlist}
                                    data= {this.state.usuarios}
                                    keyExtractor={ doc => doc.createdAt }
                                    renderItem={ ({item}) => <Text>{item.owner}</Text> }
                                />
                            </ View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logo: {
        flex: 1,
        paddingBottom: 150,
    },
});

export default ScreenResultados;