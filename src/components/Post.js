import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { db } from "../firebase/config";

class Post extends Component{
    constructor(){
        super();
        this.state = {
            posteos : []
        }
    }
}

export default Post