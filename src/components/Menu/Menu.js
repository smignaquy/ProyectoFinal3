import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import CrearPost from '../../screens/CrearPost/CrearPost';
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
                name='Crear Post'
                component={CrearPost}
                options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="hammer-outline" size={size} color={color} />),
                }}
            />
        </Tab.Navigator>
    );
}

export default Menu;
