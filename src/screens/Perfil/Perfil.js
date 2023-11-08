import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { auth } from '../../firebase/config';
import MyCamera from "../../components/My-Camera/My-Camera";

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            bio:'',
            fotoPerfil:'',
            posteos:[]
        }
    }

    componentDidMount(){
        //traigo posteos del usuario
            db.collection('posts').where('owner', '===', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
                docs =>{
                    let posts = []
                    docs.forEach( doc => {
                        console.log(doc);
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                })
                        this.setState({
                        posteos: posts,
                        loading: false
                })
                })
            })
        //traigo datos del usuario
        db.collection('users').where('owner', '===', auth.currentUser.email).onSnapshot(
            docs =>{
                let posts = []
                docs.forEach( doc => {
                    console.log(doc);
                    posts.push({
                        id: doc.id,
                        data: doc.data()
            })
                    this.setState({
                        email: doc.owner,
                        username: doc.username,
                        // bio: doc.bio,
                        // fotoPerfil: doc.fotoPerfil,
            })
            })
        })


    }



    render() {
        return (
            <View style={styles.container}>
                <Text>Pagina de Perfil</Text>
                {/* <Text>Nombre de usuario</Text>
                <Text>Email del usuario</Text>
                <Text>Mini bio (si la cargó al registrarse)</Text>
                <Image 
                    styles={styles.fotoPerfil}
                />
                <Text>Cantidad total de posteos publicados por el usuario:
                    {this.state.posteos.length}
                </Text>
                <Post //con los posteos del usuario
                /> */}
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