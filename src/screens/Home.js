import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { db } from "../firebase/config";

class Home extends Component{
    constructor(){
        super();
        this.state = {
            posteos : []
        }
    }
    componentDidMount(){
        // VerPost(){
            db.collection('posts').onSnapshot(
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
        // }
    }

    render(){
        console.log(this.state.posteos);
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}>Inicio</Text>
                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('CrearPost')}}>
                    <Text style={styles.textButton}>Crear Post</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Ultimos posts</Text>
                {this.state.posteos.length == 0 ? <Text>Cargando...</Text>
                    :
                    <FlatList 
                        style={styles.flatlist}
                        data= {this.state.posteos}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        alignSelf: 'center',
        width: 50, 
        height: 50, 
        marginBottom: 10,
    },
    flatlist: {
    	width: '100%',
        flex: 1
   },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#1DA1F2',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    button: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 15,
        borderRadius: 5,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerText: {
        marginTop: 20,
        color: '#1DA1F2',
        textAlign: 'center',
    },
})

export default Home;