import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundsScreen from './components/SoundsScreen';
import SubSoundsScreen from './components/SubSoundsScreen';
import PlaySoundScreen from './components/PlaySoundScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
let identificationType;

const IdentificationType = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>{language === 'en' ? 'Sound Identification' : 'التعرف على الصوت'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, { marginRight: 30 }]} onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} >
            <Icon name="home" size={30} color="white" onPress={() => navigation.navigate('Home')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => {
          identificationType = 'existence';
          navigation.navigate('SoundsScreen');
        }}>
          <Text style={styles.optionText}>{language === 'en' ? 'Existence of Sound' : 'وجود الصوت'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => {
          identificationType = 'direction';
          navigation.navigate('SoundsScreen');
        }}>
          <Text style={styles.optionText}>{language === 'en' ? 'Direction of Sound' : 'اتجاه الصوت'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SoundIdentification = () => {
  return (
    <Stack.Navigator initialRouteName="IdentificationType">
      <Stack.Screen
        name="IdentificationType"
        component={IdentificationType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SoundsScreen"
        component={SoundsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubSounds"
        component={SubSoundsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaySoundScreen"
        component={PlaySoundScreen}
        options={{ headerShown: false }}
        initialParams={{ identificationType: identificationType }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 72,
    backgroundColor: '#052E45',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginRight: -10,
    top: -15,
    zIndex: 1,
  },
  accountButton: {
    left: 10,
    top: 25,
    position: 'relative',
  },
  screenTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -40,
  },
  screenTitleText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    right: 10,
    top: 15,
    position: 'relative',
    padding: 10
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  option: {
    backgroundColor: '#052E45',
    width: 300,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default SoundIdentification;
