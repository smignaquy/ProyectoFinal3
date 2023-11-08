import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { auth } from '../../firebase/config';
import MyCamera from "../../components/My-Camera/My-Camera";

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            bio:'',
            fotoPerfil:'',
            posteos:[]
        }
    }

    componentDidMount(){
        //quiero cmparar el mail de las props con los usuarios de la base, recuperar los datos de la base y cargadlos al estado
    }


    

    render() {
        return (
            <View style={styles.container}>
                <Text>Nombre de usuario</Text>
                <Text>Email del usuario</Text>
                <Text>Mini bio (si la cargó al registrarse)</Text>
                <Image 
                    styles={styles.fotoPerfil}
                />
                <Text>Cantidad total de posteos publicados por el usuario:
                    {this.state.posteos.length}
                </Text>
                <Post //con los posteos del usuario
                />
            {/* if ternario, si estoy en mi perfil, deberia poder: 
                Permitir borrar posteos.
                Botón para el logout completo del usuario. Si el logout se realiza correctamente la aplicación debe redirigir al usuario a la pantalla de login.

            */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default MiPerfil;