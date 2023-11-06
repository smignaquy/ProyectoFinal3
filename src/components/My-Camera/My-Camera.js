import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text } from 'react-native-web';


class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permisos : false, // permisos de acceso al hardware para usar la camara
            urlInternaFoto: '', //url temporal interna de la foto
            mostrarCamara: true,
        }

        this.metodosDeCamara = '' //referenciar a loos metoodos internos del componente camera
    }

    componentDidMount(){
        //Pedir permisos para uso de hardware
        Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true,
                })
            })
            .catch( e => console.log(e) )
    }
    render(){
        return(
            <View> 
            <Camera 
                type={Camera.Constants.Type.front}
                ref = {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
            /> 
            <TouchableOpacity> 
                <Text> Sacar Foto </Text>
            </TouchableOpacity> 
            </View>
            
        )
    }
}

export default MyCamera;