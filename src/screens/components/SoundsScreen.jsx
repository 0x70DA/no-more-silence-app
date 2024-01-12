import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

const sounds = [
  'animal_and_insects_sounds',
  'electric_devices_sounds',
  'human_sounds',
  'nature_sounds',
  'public_sounds',
  'public_transport_sounds',
];

const SoundsScreen = ({ navigation }) => {
  const [selectedSound, setSelectedSound] = useState(null);

  const handleSoundPress = sound => {
    setSelectedSound(sound);
    navigation.navigate('SubSounds', { sound });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../../assets/account.png')}
            style={styles.button}
          />
        </TouchableOpacity>

        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Sounds</Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../assets/home.png')}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', top: 90}}>
        {sounds.map((sound, index) => (
          <TouchableOpacity
            key={index}
            style={styles.soundButton}
            onPress={() => handleSoundPress(sound)}>
            <Text style={styles.soundText}>
              {sound.split('_').map(word => {
                return word[0].toUpperCase() + word.slice(1);
              })
                .join(' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
    borderRadius: 10,
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
    borderRadius: 10,
    top: 15,
  },
  soundButton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    width: 351,
    height: 73,
  },
  soundText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '800',
    textAlign: 'center',
    padding: 10,
  },
});

export default SoundsScreen;