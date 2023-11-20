import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false, //permisos de acceso al hardware para usar la cámara.
            urlInternaFoto: '', //aca va la url temporal interna de la foto.
            mostrarCamara: true,
            estado: '',
        }
        this.metodosDeCamara = '' //referenciar a los métodos internos del componente camera.
    }

    componentDidMount(){
        this.setState({
            estado: '',
        })
       //Pedir permisos para uso del hardware.
       Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true
                })
            } )
            .catch( e => console.log(e)) 
    }

    SacarFoto(){
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //La ruta interna de la foto en la computadora.
                    mostrarCamara: false //escondemos la cámara para mostrar un preview de la foto al usuario.
                })
            })
            .catch(e=>console.log(e))
    }

    cancelar(){
        console.log("Cancelando...");
        this.setState({
            urlInternaFoto:'',
            mostrarCamara: true,
            estado: ''
        })
    }

    guardarFoto(){
        // this.props.cambioEstadoPublicar (false)
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob()) //.blob() recupera datos binarios. Las fotos son archivos binarios.
            .then( image => {

                const ruta = storage.ref(`photos/${Date.now()}.jpg`);
                ruta.put( image )
                    .then(()=>{
                        ruta.getDownloadURL() //La url de guardado de la foto.
                            .then( url => {
                                //Necesitamos guardar la url en internet como un dato más del posteo.
                                this.props.traerUrlDeFoto(url)
                                console.log('Foto Guardada');
                                //Borra la url temporal del estado.
                                this.setState({
                                    urlInternaFoto: '',
                                    estado: 'La foto se cargo correctamente!'
                                })
                                // this.props.cambioEstadoPublicar (true)
                            } )
                    })

            })
            .catch( e => console.log(e))

    }


    render(){
        return(
            <View style={ styles.container}>
                {this.state.cargandofoto ? 
            <View style = {styles.blackscreen} /> : null  
            }


                {
                    this.state.permisos ?
                        this.state.mostrarCamara === false ?
                        //Preview
                        <React.Fragment style={styles.fragment}>
                            <Image 
                                source={{uri:this.state.urlInternaFoto}}
                                style={ styles.cameraBody }
                            />
                            {/* Corregir estilos para que se vea la imagen */}
                            {/* Corregir estilos para que los botones desaparezcan una vez que el usuario aceptó o canceló el preview */}
                            <TouchableOpacity style={styles.botonAceptar} onPress={ () => this.guardarFoto() }>
                                <Text style={styles.textoAceptar}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonCancelar} onPress={()=>this.cancelar()}>
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                            <Text>{this.state.estado}</Text>
                        </React.Fragment>
                        
                        :
                        //Cámara.
                        <React.Fragment>
                        {/* Corregir estilos para que se vea bien la cámara */}
                            <Camera 
                                type={Camera.Constants.Type.front}
                                ref= { metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                style = { styles.cameraBody }
                            />
                            <TouchableOpacity  style = { styles.button } onPress={()=> this.SacarFoto()}>
                                <Text style={styles.textoBoton}>Sacar Foto</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    :
                    <Text style={styles.permisos}>La cámara no tiene permisos</Text>

                }
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 200,
        height:300
    },
    cameraBody: {
        flex:7,
        width: 200,
        height:200
    },
    button:{
        marginLeft: 20,
        backgroundColor: '#1DA1F2',
        paddingVertical: 5,
        borderRadius: 5,
        width: 100, 
        height: 30,
        marginBottom: 10,
        marginTop: 5, 
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botonAceptar: {
        backgroundColor: '#1DA1F2',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginBottom: 5,
        marginTop: 5,
    },
    botonCancelar: {
        backgroundColor: '#1DA1F2',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
    },
    textoAceptar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textoCancelar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    permisos: {
        width: 300,
    },
    fragment: {
        width: 300,
        alignItems: 'center',
    }
})


export default MyCamera;