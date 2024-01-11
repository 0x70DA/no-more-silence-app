import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SoundsScreen from './components/SoundsScreen';
import SubSoundsScreen from './components/SubSoundsScreen';
import PlaySoundScreen from './components/PlaySoundScreen';

const SoundPracticeStack = createNativeStackNavigator();

const SoundPractice = () => {
  return (
    <SoundPracticeStack.Navigator initialRouteName="SoundsScreen">
      <SoundPracticeStack.Screen
        name="SoundsScreen"
        component={SoundsScreen}
        options={{ headerShown: false }}
      />
      <SoundPracticeStack.Screen
        name="SubSounds"
        component={SubSoundsScreen}
        options={{ headerShown: false }}
      />
      <SoundPracticeStack.Screen
        name="PlaySoundScreen"
        component={PlaySoundScreen}
        options={{ headerShown: false }}
      />
    </SoundPracticeStack.Navigator>
  );
};

export default SoundPractice;
