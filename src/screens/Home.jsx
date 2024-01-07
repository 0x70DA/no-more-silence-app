import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{backgroundColor: ''}}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/arrow_1.png')}
        style={{
          width: 234,
          height: 145,
          position: 'absolute',
          top: 91,
          left: 19,
        }}
      />
      <TouchableOpacity
        style={styles.identificationButton}
        onPress={() => navigation.navigate('SoundId')}>
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <Text style={styles.buttonText}>sound{'\n'}identification</Text>
          <Image
            source={require('../../assets/sound_identification.png')}
            style={{width: 62, height: 70, position: 'absolute', right: 0}}
          />
        </View>
      </TouchableOpacity>

      <Image
        source={require('../../assets/arrow_2.png')}
        style={{
          width: 194,
          height: 200,
          position: 'absolute',
          top: 324,
          left: 50,
        }}
      />
      <TouchableOpacity
        style={styles.practiceButton}
        onPress={() => navigation.navigate('SoundPractice')}>
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <Text style={styles.buttonText}>differnet sound{'\n'}practice</Text>
          <Image
            source={require('../../assets/sound_practice.png')}
            style={{width: 44, height: 62, position: 'absolute', right: 10}}
          />
        </View>
      </TouchableOpacity>

      <Image
        source={require('../../assets/arrow_3.png')}
        style={{
          width: 187,
          height: 129,
          position: 'absolute',
          top: 601,
          left: 47,
        }}
      />
      <TouchableOpacity
        style={styles.auditoryButton}
        onPress={() => navigation.navigate('AuditoryDiscrimination')}>
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <Text style={styles.buttonText}>
            auditory discrimination activity
          </Text>
          <Image
            source={require('../../assets/auditory.png')}
            style={{
              width: 44,
              height: 62,
              position: 'absolute',
              right: 20,
              top: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 413,
    height: 913,
    backgroundColor: 'white',
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
  identificationButton: {
    backgroundColor: '#052E45',
    width: 236,
    height: 72,
    position: 'absolute',
    top: 238,
    left: 145,
  },
  practiceButton: {
    backgroundColor: '#052E45',
    width: 268,
    height: 72,
    position: 'absolute',
    top: 528,
    left: 11,
  },
  auditoryButton: {
    backgroundColor: '#052E45',
    width: 297,
    height: 83,
    position: 'absolute',
    top: 733,
    left: 102,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: '800',
    marginLeft: 20,
  },
});

export default Home;
