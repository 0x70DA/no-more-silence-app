import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Welcome from './src/screens/Welcome';
import Note from './src/screens/Note';
import Login from './src/screens/Login';
import List from './src/screens/List';
import Details from './src/screens/Details';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './FirebaseConfig';

const stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Welcome">
        {user ? (
          <stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{headerShown: false}}
          />
        ) : (
          <stack.Group initialRouteName="Welcome">
            <stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Note"
              component={Note}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </stack.Group>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}
