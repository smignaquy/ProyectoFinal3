import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase/config';

class ScreenResultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: []
        };
    }

    componentDidMount() {
        let textoBuscado = this.props.route.params.textoBuscado.toLowerCase()
        db.collection('users').onSnapshot(
            docs => {
                let users = []
                docs.forEach(doc => {
                    if(doc.owner.toLowerCase().includes(textoBuscado)){
                        users.push(doc.data())
                    }
                })

                this.setState({
                    usuarios: users,
                })
            }
        )
    }

    render() {
        let textoBuscado = this.props.route.params.textoBuscado
        return (
            <View style={styles.container}>
                {this.state.usuarios.length == 0 ? <Text>No se han encontrado resultados de busqueda para {textoBuscado}</Text>
                    :
                    <FlatList 
                        style={styles.flatlist}
                        data= {this.state.usuarios}
                        keyExtractor={ doc => doc.id.toString() }
                        renderItem={ ({item}) => <Text>Estos son tus resultados de busqueda de {textoBuscado}</Text> }
                    />
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
});

export default ScreenResultados;