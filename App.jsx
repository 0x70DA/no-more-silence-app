import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Welcome from './src/screens/Welcome';
import WelcomeMessage from './src/screens/WelcomeMessage';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Notes from './src/screens/Notes';
import Account from './src/screens/Account';
import SoundIdentification from './src/screens/SoundIdentification';
import SoundPractice from './src/screens/SoundPractice';
import AuditoryDiscrimination from './src/screens/AuditoryDiscrimination';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName='Notes'>
      <InsideStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="Notes"
        component={Notes}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="SoundIdentification"
        component={SoundIdentification}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="SoundPractice"
        component={SoundPractice}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="AuditoryDiscrimination"
        component={AuditoryDiscrimination}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set the default app language to English if it is not set
    AsyncStorage.getItem('language').then(language => {
      if (!language) {
        AsyncStorage.setItem('language', 'en');
      }
    });

    onAuthStateChanged(FIREBASE_AUTH, user => {
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
            options={{ headerShown: false }}
          />
        ) : (
          <stack.Group initialRouteName="Welcome">
            <stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="WelcomeMessage"
              component={WelcomeMessage}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </stack.Group>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}
