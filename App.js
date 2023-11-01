import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Componentes y Screens
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import CrearPostScreen from './src/screens/CrearPost';


export default function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Register" component={RegisterScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Home" component={HomeScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="CrearPost" component={CrearPostScreen} options={ { headerShown: false } }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

