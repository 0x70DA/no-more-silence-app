import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const en = require('../locales/en/welcomeMessage.json');
const ar = require('../locales/ar/welcomeMessage.json');

const WelcomeMessage = ({ navigation }) => {
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
            <Text style={[styles.text, language === 'ar' && { textAlign: 'right', fontStyle: 'normal' }]}>
              {text.message}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
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
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
  },
  oval1: {
    position: 'absolute',
    left: '-50%',
    top: 0,
    width: '80%',
    height: '50%',
    borderRadius: 500,
    backgroundColor: '#E3EFFA',
  },
  oval2: {
    position: 'absolute',
    left: '60%',
    top: '60%',
    width: '80%',
    height: '50%',
    borderRadius: 500,
    backgroundColor: '#E3EFFA',
  },
  centeredContainer: {
    flexGrow: 1,
    marginBottom: 100,
    top: '10%'
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    lineHeight: 35,
  },
  button: {
    backgroundColor: '#052E45',
    width: '50%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 40,
    marginLeft: 210,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'center',
  },
});

export default WelcomeMessage;
