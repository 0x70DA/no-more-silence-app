import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SoundsScreen from './components/SoundsScreen';
import SubSoundsScreen from './components/SubSoundsScreen';
import PlaySoundScreen from './components/PlaySoundScreen';

const Stack = createNativeStackNavigator();

const IdentificationType = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.button}
          />
        </TouchableOpacity>

        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Sound Identefication</Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/home.png')}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <Text>Identification Type</Text>
        <TouchableOpacity>
          <Text>Existence of Sound</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Direction of Sound</Text>
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
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    height: 72,
    backgroundColor: '#052E45',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  button: {
    width: 55,
    height: 45,
    resizeMode: 'contain',
  },
  accountButton: {
    backgroundColor: '#D9D9D9',
    left: 10,
    top: 15,
  },
  screenTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
  },
  screenTitleText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#D9D9D9',
    right: 10,
    top: 15,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SoundIdentification;
