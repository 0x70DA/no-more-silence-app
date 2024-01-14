import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const en = require('../locales/en/notes.json');
const ar = require('../locales/ar/notes.json');

const Notes = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState(en);

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

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.oval1} />
        <View style={styles.oval2} />
        <View style={styles.centeredContainer}>
          <View style={styles.textContainer}>
            {text.notes.map((text, index) => (
              <View key={index} style={styles.row}>
                <Icon name="angle-double-right" size={28} color="black" style={styles.icon} />
                <Text style={styles.text}>{text}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>{language === 'en' ? 'Got It' : 'فهمت'}</Text>
          </TouchableOpacity>
        </View>
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
  backgroundContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
  },
  oval1: {
    position: 'absolute',
    left: -250 / 2,
    top: 0,
    width: 300,
    height: 300,
    borderRadius: 500,
    backgroundColor: '#E3EFFA',
  },
  oval2: {
    position: 'absolute',
    left: 233,
    top: 515,
    width: 363,
    height: 383,
    borderRadius: 500,
    backgroundColor: '#E3EFFA',
  },
  centeredContainer: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    lineHeight: 30,
    paddingVertical: 25,
    paddingRight: 20,
    paddingLeft: 50,
    position: 'relative',
    left: 10,
  },
  button: {
    backgroundColor: '#052E45',
    width: 181,
    height: 52,
    alignSelf: 'center',
    borderRadius: 10,
    marginRight: 30,
    marginLeft: 210,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 9,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
});

export default Notes;
