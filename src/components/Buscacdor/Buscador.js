import React, { Component } from "react";
// import { db, auth } from '../firebase/config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoBuscador: '',
            usuarios: [],
            loading: true,
        }
    }
   
    componentDidMount() {
        db.collection('users').onSnapshot(querySnapshot => {
          let users = [];
          querySnapshot.forEach(doc => {
            users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({
            usuarios: users,
            loading: false,
          });
        });
      }

    // buscar(email){
    //     this.props.navigate('ScreenResultados')
    // }

    buscar() {
        const usuariosfiltrados = this.state.usuarios.filter(user =>
          user.data.email.includes(this.state.textoBuscador.toLowerCase())
        );
        console.log('Usuarios filtrados: ', usuariosfiltrados);
    
        this.props.navigation.navigate('ScreenResultados', {
          usuarios: usuariosfiltrados,
        });
      }
    

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ textoBuscador: text })}
                    placeholder="Buscar por email"
                    multiline={true}
                    value={this.state.textoBuscador}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.buscar(this.state.textoBuscador)}>
                    <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
        width: 200, 
        height: 20,
    },
    button: {
        marginLeft: 20,
        backgroundColor: '#1DA1F2',
        paddingVertical: 5,
        borderRadius: 5,
        width: 100, 
        height: 30,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Buscador;

