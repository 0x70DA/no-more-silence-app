import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WelcomeMessage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.oval1} />
        <View style={styles.oval2} />
        <View style={styles.centeredContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              hello,{'\n'}our application is made{'\n'}to make communication
              {'\n'}
              and speech therapy more{'\n'}accessible at home. by{'\n'}providing
              a lot of different{'\n'}sounds and illustrating{'\n'}videos and
              pictures.{'\n'}
              please make sure that{'\n'}you still need to visit{'\n'}a
              specialist doctor.{'\n'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>got it</Text>
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
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    lineHeight: 35,
  },
  button: {
    backgroundColor: '#052E45',
    width: 181,
    height: 52,
    alignSelf: 'center',
    borderRadius: 10,
    marginRight: 30,
    marginLeft: 210,
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
});

export default WelcomeMessage;
