import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './src/screens/Welcome';
import Note from './src/screens/Note';
import Login from './src/screens/Login';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Welcome">
        <stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <stack.Screen name="Note" component={Note} options={{ headerShown: false }} />
        <stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
