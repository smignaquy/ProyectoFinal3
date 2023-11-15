import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
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
                })
            }
        )
    }

    render() {
        let textoBuscado = this.props.route.params.textoBuscado
        console.log('render')
        return (
            <View style={styles.container}>
                {this.state.usuarios.length === 0 ? <ActivityIndicator size='large' color='blue' /> 
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
});

export default ScreenResultados;