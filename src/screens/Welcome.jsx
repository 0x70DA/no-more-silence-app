import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/welcome.png')} style={styles.img} resizeMode="cover"/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Note')}>
        <Text style={styles.text}>get started</Text>
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
  img: {
    width: 260,
    height: 240,
    alignSelf: 'center',
    marginTop: 200,
  }
});
