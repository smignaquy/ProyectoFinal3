import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name='Menu' component={Menu} options={ { headerShown: true } }/>
//     </Tab.Navigator>
//   );
// }

// Componentes y Screens
import LoginScreen from './src/screens/Login/Login';
import RegisterScreen from './src/screens/Register/Register';
import HomeScreen from './src/screens/Home/Home'
import Menu from './src/components/Menu/Menu';
import CrearPostScreen from './src/screens/CrearPost/CrearPost';
import PerfilScreen from './src/screens/Perfil/Perfil';
import Buscador from './src/components/Buscacdor/Buscador';


export default function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Register" component={RegisterScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="CrearPost" component={CrearPostScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Home" component={HomeScreen} options={ { headerShown: false } }/>
        <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
        <Stack.Screen name="Perfil" component={PerfilScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Buscador" component={Buscador} options={ { headerShown: false } }/>
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

