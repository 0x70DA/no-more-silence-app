import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const en = require('../../locales/en/sounds.json');
const ar = require('../../locales/ar/sounds.json');
const soundsMapping = require('../../sounds_mapping.json');

const SubSoundsScreen = ({ route, navigation }) => {
  const { sound } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [subSounds, setSubSounds] = useState({});
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState(null);

  useEffect(() => {
    // Get current app language
    const getLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('language');
        if (lang !== null) {
          setLanguage(lang);
          setText(lang === 'en' ? en : ar);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLanguage();
  }, []);

  useEffect(() => {
    if (!text) return;
    setLoading(true);
    const subSoundsList = {};
    for (const subSound in soundsMapping[sound]) {
      subSoundsList[Object.keys(soundsMapping[sound][subSound])[0]] = text[Object.keys(soundsMapping[sound][subSound])[0]];
    }
    setSubSounds(subSoundsList);
    setLoading(false);
  }, [text]);


  const handleSubSoundPress = subSound => {
    navigation.navigate('PlaySoundScreen', { sound, subSound });
  };

  // Filter sub-options based on the search query
  const filteredSubSounds = Object.keys(subSounds).filter(subSound =>
    subSounds[subSound].toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>
            {text && text[sound].split(' ').slice(0, -1).join(' ') + '\n' + text[sound].split(' ').slice(-1)}
          </Text>
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
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView style={{ marginTop: 90, flex: 1 }}>
          <TextInput
            style={styles.searchBar}
            placeholder={language === 'en' ? 'Search...' : 'ابحث...'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {!loading && text ? (
            <View
              style={{ padding: 10, overflow: 'scroll' }}>
              {filteredSubSounds.map(subSound => (
                <TouchableOpacity
                  key={subSound}
                  style={styles.subSoundButton}
                  onPress={() => handleSubSoundPress(subSound)}>
                  <Text style={styles.soundText}>{subSounds[subSound]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View>
              <ActivityIndicator size="45" color="black" style={{ marginTop: 100 }} />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
  accountButton: {
    left: 5,
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
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  loadingText: {
    padding: 5,
    alignSelf: 'center',
    color: 'black'
  },
  subSoundButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
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

export default SubSoundsScreen;