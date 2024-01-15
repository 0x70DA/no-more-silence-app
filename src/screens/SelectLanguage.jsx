import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectLanguage = ({ navigation }) => {
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

  const setLanguageAndNavigate = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
      navigation.navigate('WelcomeMessage');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!language && (
        <View style={styles.container}>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => setLanguageAndNavigate('ar')}>
              <Text style={styles.buttonText}>العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setLanguageAndNavigate('en')}>
              <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3EFFA',
  },
  button: {
    backgroundColor: '#052E45',
    width: 300,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default SelectLanguage;
