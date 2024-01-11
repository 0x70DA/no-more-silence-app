import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';

const soundsMapping = require('../../sounds_mapping.json');

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
            source={require('../../../assets/account.png')}
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
            source={require('../../../assets/home.png')}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView style={{ marginTop: 90, flex: 1 }}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Sounds"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {!loading ? (
            <View
              style={{ padding: 10, overflow: 'scroll' }}>
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