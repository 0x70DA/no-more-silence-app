import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Sounds</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, {marginRight: 30}]} onPress={() => navigation.navigate('Account')}>
            <Image source={require('../../../assets/account.png')} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../../assets/home.png')} style={styles.button} />
          </TouchableOpacity>
        </View>
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
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    right: 10,
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