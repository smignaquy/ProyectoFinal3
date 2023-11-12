import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';


class ScreenResultados extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: []
        };
    }

    // componentDidMount() {
    //     db.collection('users').where("owner", "==", this.props.).onSnapshot( me falta la parte de las props con que comparar el owner
    //         docs => {
    //             let users = []
    //             docs.forEach(doc => {
    //                 users.push(doc.data())
    //             })

    //             this.setState({
    //                 usuarios: users,
    //             })
    //         }
    //     )
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Estos son tus resultados de busqueda</Text>
                {this.state.usuarios.length == 0 ? <ActivityIndicator size='large' color='blue' />
                    :
                    <FlatList 
                        style={styles.flatlist}
                        data= {this.state.usuarios}
                        keyExtractor={ doc => doc.id.toString() }
                        renderItem={ ({item}) => <Text> {item.owner} </Text> }
                    />
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
});

export default ScreenResultados;