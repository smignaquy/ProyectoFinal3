import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import CrearPost from '../../screens/CrearPost/CrearPost';
import MiPerfil from '../../screens/Perfil/Perfil';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

function Menu () {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Feather name="twitter" size={size} color={color} />),
                }}
            />
            <Tab.Screen
                name='CrearPost'
                component={CrearPost}
                options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="hammer-outline" size={size} color={color} />),
                }}
            />
            <Tab.Screen
                name='Perfil'
                component={MiPerfil}
                options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />),
                }}
            />
        </Tab.Navigator>
    );
}

export default Menu;
