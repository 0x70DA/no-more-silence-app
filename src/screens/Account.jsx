import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const en = require('../locales/en/account.json');
const ar = require('../locales/ar/account.json');

const Account = ({ navigation }) => {
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

  const handleLanguageChange = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      // Reset navigation state to update language
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Notes' }],
      });
      navigation.dispatch(resetAction);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormLinkPress = () => {
    const formUrl = 'https://forms.gle/d4F2Y5STXVhjsHkW8';
    Linking.openURL(formUrl);
  };

  return (
    <View style={styles.container}>
      {text && (
        <>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.screenTitle}>
              <Text style={styles.screenTitleText}>{text.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.accountButton, { marginRight: 30 }]} disabled={true}>
                <Icon name="person" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contactContainer}>
              <Text style={[styles.contactText, language === 'ar' && { textAlign: 'right' }]} selectable={true}>
                {text.contact}
                <Text style={{ color: 'blue' }} onPress={handleFormLinkPress}> {text.form}</Text>.
              </Text>
            </View>

            <View style={styles.selectLangContainer}>
              <Text style={styles.selectLangText}>{text.select_language}</Text>
              <View style={styles.radioButtonGroup}>
                <RadioButton.Item
                  label="English"
                  value="en"
                  color="blue"
                  status={language === 'en' ? 'checked' : 'unchecked'}
                  onPress={() => handleLanguageChange('en')}
                />
                <RadioButton.Item
                  label="Arabic/العربية"
                  value="ar"
                  color="blue"
                  status={language === 'ar' ? 'checked' : 'unchecked'}
                  onPress={() => handleLanguageChange('ar')}
                />
              </View>
            </View>
            <View style={styles.signOutContainer}>
              <TouchableOpacity style={styles.signOutButton} onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={styles.signOutText}>{text.logout}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.bottomBar} />
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>{text.copyright} © No More Silence</Text>
          </View>
        </>
      )}
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
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  accountButton: {
    top: 10,
    left: 10,
  },
  homeButton: {
    top: 10,
  },
  screenTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitleText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contactContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#E3EFFA',
  },
  contactText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'justify',
    lineHeight: 40,
  },
  selectLangContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectLangText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  signOutContainer: {
    marginBottom: 15,
    width: '50%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signOutButton: {
    backgroundColor: '#052E45',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signOutText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomBar: {
    width: '100%',
    height: 72,
    backgroundColor: '#052E45',
    position: 'absolute',
    bottom: 0,
  },
  copyrightContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#052E45',
    width: '100%',
    height: '12%'
  },
  copyrightText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  },
});

export default Account;
