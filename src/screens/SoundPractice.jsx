import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SoundsScreen from './components/SoundsScreen';
import SubSoundsScreen from './components/SubSoundsScreen';
import PlaySoundScreen from './components/PlaySoundScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

const SoundPracticeStack = createNativeStackNavigator();

const SoundPractice = ({ navigation }) => {
  const [seconds, setSeconds] = useState(25 * 60);  // 25 minutes
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Get current app language
    const getLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('language');
        if (lang !== null) {
          setLanguage(lang);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLanguage();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => Math.max(0, prevSeconds - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      Alert.alert(
        language === 'en' ? 'Alert' : 'تنبيه',
        language === 'en' ? 'Time is up!' : 'انتهى الوقت!',
        [
          {
            text: language === 'en' ? 'Continue without timer' : 'متابعة بدون مؤقت',
            style: 'cancel',
          },
          {
            text: language === 'en' ? 'End session' : 'إنهاء الجلسة',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    }
  }, [seconds]);

  return (
    <TimerContext.Provider value={seconds}>
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
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);

export default SoundPractice;
export { useTimer };

