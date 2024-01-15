import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ navigation }) => {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    // Get current app language
    const getLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('language');
        if (lang) {
          setLanguage(lang);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLanguage();
  }, []);

  const getStarted = () => {
    if (!language) {
      navigation.navigate('SelectLanguage');
    } else {
      navigation.navigate('WelcomeMessage');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/welcome.png')} style={styles.image} resizeMode="cover" />
      <TouchableOpacity
        style={styles.button}
        onPress={getStarted}>
        <Text style={styles.text}>{language === 'ar' ? 'البدء' : 'Get Started'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3EFFA',
    flex: 1,
  },
  button: {
    backgroundColor: '#052E45',
    borderRadius: 10,
    width: 180,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 29,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 376,
    height: 256,
    alignSelf: 'center',
    marginTop: 200,
  }
});
