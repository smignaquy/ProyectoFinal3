import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db } from "../../firebase/config";
import Post from "../../components/Post/Post";
import Header from '../../components/Header/Header';
import { ActivityIndicator } from "react-native-web";

class Home extends Component{
    constructor(){
        super();
        this.state = {
            posteos : []
        }
    }
    componentDidMount(){
        // VerPost(){
            db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
                <Header style={styles.logo} />
                <Text style={styles.title}>Inicio</Text>
                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('CrearPost')}}>
                    <Text style={styles.textButton}>Crear Post</Text>
                </TouchableOpacity>
                <View style={styles.lineaAzul}></View>
                <View>
                <Text style={styles.title}>Últimos posts</Text>
                {this.state.posteos.length == 0 ? <ActivityIndicator size='large' color='blue' />
                    :
                    <FlatList 
                        style={styles.flatlist}
                        data= {this.state.posteos}
                        keyExtractor={ doc => doc.id.toString() }
                        renderItem={ ({item}) => <Post infoPost={item}/> }
                    />
                }
                </View>
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
    lineaAzul: {
        height: 1,
        alignSelf: 'center',
        margin: 15,
        width: '100%',
        backgroundColor: '#1DA1F2', // Color azul
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
        paddingTop: 15,
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
    logo: {
        flex: 1
    }
})

export default Home;