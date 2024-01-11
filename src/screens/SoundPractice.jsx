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
import PlaySoundScreen from './components/PlaySoundScreen';

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
          <Text style={styles.screenTitleText}>Sounds</Text>
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
          <Text style={styles.screenTitleText}>
            {sound.split('_').map(word => {
              return word[0].toUpperCase() + word.slice(1);
            }).join(' ')
            }
          </Text>
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
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
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
    backgroundColor: '#052E45',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
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
    position: 'relative',
    width: 300,
    top: 20,
  },
  screenTitleText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  homeButton: {
    backgroundColor: '#D9D9D9',
    right: 10,
    top: 15,
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
  loadingText: {
    padding: 5,
    marginLeft: 10,
    color: 'black'
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
