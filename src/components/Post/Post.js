import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { db } from "../../firebase/config";
import Icon from 'react-native-vector-icons/Feather';
import IconFull from '@expo/vector-icons';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            // like: false,
            // cantidadDeLikes: this.props.infoPost.datos.likes.length
        }
    }

    // componentDidMount(){
    //     //Indicar si el post ya está likeado o no.
    //     if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){
    //         this.setState({
    //             like: true
    //         })
    //     }
    // }

    // likear(){
    //     //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    
    //     //update en base de datos
    //     db.collection('posts').doc(this.props.infoPost.id).update({
    //         likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    //     })
    //         .then( res => {
    //             this.setState({
    //                 like: true,
    //                 cantidadDeLikes: this.props.infoPost.datos.likes.length
    //             })
    //         })
    //         .catch( e => console.log(e))
    //    }
    
    //    unLike(){
    //     //Quitar del array de likes al usario que está mirando el post.
    //     db.collection('posts').doc(this.props.infoPost.id).update({
    //         likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    //     })
    //     .then( res => {
    //         this.setState({
    //             like: false,
    //             cantidadDeLikes: this.props.infoPost.datos.likes.length
    //         })
    //     })
    //     .catch( e => console.log(e))
    //    }

    render() {
        console.log(this.props.infoPost);
        return (
            <View style={styles.postContainer}>
                <TouchableOpacity style={styles.postUsario} onPress={() => {this.props.navigation.navigate('Perfil')}}>Usuario: {this.props.infoPost.data.owner}</TouchableOpacity>
                <Text style={styles.postText}>{this.props.infoPost.data.textoPost}</Text>
                {this.state.like ? 
                    <TouchableOpacity onPress={()=>this.unLike()}>
                        <Icon name="heart" size={30} color="#1DA1F2" style={styles.icon} /> 
                    </TouchableOpacity> 
                :
                    <TouchableOpacity onPress={()=>this.unLike()}>
                        <Icon name="heart" size={30} color="#1DA1F2" style={styles.icon} /> 
                    </TouchableOpacity> 
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        border: '1px solid #e1e8ed', // Puedes ajustar el estilo del borde según tus preferencias
    },
    postUsario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DA1F2',
    },
    postText: {
        fontSize: 14,
    },
    icon: {
        alignSelf: 'flex-end'
    }
});

export default Post;
