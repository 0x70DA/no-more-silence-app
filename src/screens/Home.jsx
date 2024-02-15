import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Get current app language
    const getLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('language');
        if (lang !== null) {
          setLanguage(lang);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLanguage();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>{language === 'en' ? 'Home Page' : 'الصفحة الرئيسية'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, { marginRight: 30 }]} onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} >
            <Icon name="home" size={30} color="white" disabled={true} />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('../../assets/arrow_1.png')}
        style={{
          width: '30%',
          height: '30%',
          position: 'absolute',
          top: '3%',
          left: '5%',
          resizeMode: 'contain',
        }}
      />
      <TouchableOpacity
        style={styles.identificationButton}
        onPress={() => {
          Alert.alert(
            language === 'en' ? 'Start Timer' : 'بدء المؤقت',
            language === 'en' ? 'A new 25-minute timer is starting. Are you ready?' : 'سوف يبدأ مؤقت جديد لمدة 25 دقيقة. هل أنت مستعد؟',
            [
              {
                text: language === 'en' ? 'Cancel' : 'إلغاء',
                style: 'cancel',
              },
              {
                text: language === 'en' ? 'OK' : 'موافق',
                onPress: () => navigation.navigate('SoundIdentification'),
              },
            ],
          )
        }}>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={styles.buttonText}>{language === 'en' ? 'Sound\nIdentification' : 'التعرف\nعلى الصوت'}</Text>
          <Image
            source={require('../../assets/sound_identification.png')}
            style={{ width: 62, height: 70, position: 'absolute', right: 0 }}
          />
        </View>
      </TouchableOpacity>

      <Image
        source={require('../../assets/arrow_2.png')}
        style={{
          width: '28%',
          height: '23%',
          position: 'absolute',
          top: '33%',
          left: '20%',
          resizeMode: 'contain',
        }}
      />
      <TouchableOpacity
        style={styles.practiceButton}
        onPress={() => {
          Alert.alert(
            language === 'en' ? 'Start Timer' : 'بدء المؤقت',
            language === 'en' ? 'A new 25-minute timer is starting. Are you ready?' : 'سوف يبدأ مؤقت جديد لمدة 25 دقيقة. هل أنت مستعد؟',
            [
              {
                text: language === 'en' ? 'Cancel' : 'إلغاء',
                style: 'cancel',
              },
              {
                text: language === 'en' ? 'OK' : 'موافق',
                onPress: () => navigation.navigate('SoundPractice'),
              },
            ],
          )
        }}>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={styles.buttonText}>{language === 'en' ? 'Different Sound\nPractice' : 'التدريب على أصوات\nمختلفة'}</Text>
          <Image
            source={require('../../assets/sound_practice.png')}
            style={{ width: 44, height: 62, position: 'absolute', right: 10 }}
          />
        </View>
      </TouchableOpacity>

      <Image
        source={require('../../assets/arrow_3.png')}
        style={{
          width: '40%',
          height: '35%',
          position: 'absolute',
          top: '58%',
          left: '10%',
          resizeMode: 'contain',
        }}
      />
      <TouchableOpacity
        style={styles.auditoryButton}
        onPress={() => navigation.navigate('AuditoryDiscrimination')}>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={styles.buttonText}>
            {language === 'en' ? 'Auditory Discrimination\nActivity' : '\nنشاط التمييز السمعي'}
          </Text>
          <Image
            source={require('../../assets/auditory.png')}
            style={{
              width: 44,
              height: 62,
              position: 'absolute',
              right: 30,
              top: -2,
            }}
          />
        </View>
      </TouchableOpacity>
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
    height: '10%',
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
    left: 10,
    top: '25%',
    position: 'relative',
  },
  screenTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    right: 10,
    top: '15%',
    position: 'relative',
    padding: 10,
  },
  identificationButton: {
    borderRadius: 10,
    backgroundColor: '#052E45',
    width: '60%',
    height: '11%',
    position: 'absolute',
    top: '24%',
    left: '30%',
    zIndex: 1,
  },
  practiceButton: {
    borderRadius: 10,
    backgroundColor: '#052E45',
    width: '60%',
    height: '10%',
    position: 'absolute',
    top: '55%',
    left: '5%',
    zIndex: 1,
  },
  auditoryButton: {
    borderRadius: 10,
    backgroundColor: '#052E45',
    width: '80%',
    height: '10%',
    position: 'absolute',
    top: '85%',
    left: '15%',
    zIndex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 18,
    marginLeft: '5%',
  },
});

export default Home;
