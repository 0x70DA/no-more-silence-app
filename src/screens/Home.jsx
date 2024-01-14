import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Home Page</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, { marginRight: 30 }]} onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} >
            <Icon name="home" size={30} color="white" disabled={true}/>
          </TouchableOpacity>
        </View>
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
        onPress={() => navigation.navigate('SoundIdentification')}>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={styles.buttonText}>sound{'\n'}identification</Text>
          <Image
            source={require('../../assets/sound_identification.png')}
            style={{ width: 62, height: 70, position: 'absolute', right: 0 }}
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
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={styles.buttonText}>differnet sound{'\n'}practice</Text>
          <Image
            source={require('../../assets/sound_practice.png')}
            style={{ width: 44, height: 62, position: 'absolute', right: 10 }}
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
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
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
    left: 10,
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
    padding: 10
  },
  identificationButton: {
    borderRadius: 10,
    backgroundColor: '#052E45',
    width: 236,
    height: 72,
    position: 'absolute',
    top: 238,
    left: 145,
  },
  practiceButton: {
    borderRadius: 10,
    backgroundColor: '#052E45',
    width: 268,
    height: 72,
    position: 'absolute',
    top: 528,
    left: 11,
  },
  auditoryButton: {
    borderRadius: 10,
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
