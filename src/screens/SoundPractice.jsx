import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SoundPracticeStack = createNativeStackNavigator();
const soundsMapping = require('../sounds_mapping.json');
const sounds = [
  'animal_and_insects_sounds',
  'electric_devices_sounds',
  'human_sounds',
  'nature_sounds',
  'public_sounds',
  'public_transport_sounds',
];


const Sounds = ({ navigation }) => {
  const [selectedSound, setSelectedSound] = useState(null);

  const handleSoundPress = sound => {
    setSelectedSound(sound);
    navigation.navigate('SubSounds', { sound });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
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
  );
};

const SubSoundsScreen = ({ route, navigation }) => {
  const { sound } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [subSounds, setSubSounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const subSoundsList = [];
    for (const subSound in soundsMapping[sound]) {
      subSoundsList.push(Object.keys(soundsMapping[sound][subSound])[0]);
    }
    setSubSounds(subSoundsList);
    setLoading(false);
  }, [sound]);


  const handleSubSoundPress = subSound => {
    navigation.navigate('PlaySoundScreen', { sound, subSound });
  };

  // Filter sub-options based on the search query
  const filteredSubSounds = subSounds.filter(subSound =>
    subSound.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Sounds"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {!loading ? (
        <ScrollView
          style={{ padding: 10, overflow: 'scroll', marginBottom: 100 }}>
          {filteredSubSounds.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subSoundButton}
              onPress={() => handleSubSoundPress(item)}>
              <Text style={styles.soundText}>
                {item.split('_').map(word => {
                  return word[0].toUpperCase() + word.slice(1);
                }).join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator size="45" color="black" style={{ marginTop: 100 }} />
          <Text style={{ padding: 5, marginLeft: 10 }}>Loading...</Text>
        </View>
      )}
    </View>
  );
};


const PlaySoundScreen = ({ route, navigation }) => {
  const { sound, subSound } = route.params;
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    for (const item in soundsMapping[sound]) {
      if (Object.keys(soundsMapping[sound][item])[0] === subSound) {
        setAudio(Object.values(soundsMapping[sound][item])[0]["audio"]);
        setImages(Object.values(soundsMapping[sound][item])[0]["images"]);
        break;
      }
    }
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      {!loading ? (
        <View>
          {images.map((image, index) => (
            <Text key={index}>{image}</Text>
          ))}
          <Text>{audio}</Text>
        </View>
      ) : (
        <ActivityIndicator size="45" color="black" style={{ marginTop: 100 }} />
      )}
    </View>
  );
};

const SoundPractice = () => {
  return (
    <SoundPracticeStack.Navigator initialRouteName="Sounds">
      <SoundPracticeStack.Screen
        name="Sounds"
        component={Sounds}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  topBar: {
    width: 413,
    height: 72,
    backgroundColor: '#E3EFFA',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    top: 14,
  },
  logo: {
    width: 74,
    height: 45,
    resizeMode: 'contain',
  },
  soundButton: {
    padding: 10,
    marginVertical: 10,
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
  subSoundButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#D9D9D9',
    width: 351,
    height: 73,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    width: '90%',
  },
});

export default SoundPractice;
