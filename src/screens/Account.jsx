import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const Account = ({ navigation }) => {
  const handleFormLinkPress = () => {
    const formUrl = 'https://forms.gle/d4F2Y5STXVhjsHkW8';
    Linking.openURL(formUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Account</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, {marginRight: 30}]} disabled={true}>
            <Image source={require('../../assets/account.png')} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../assets/home.png')} style={styles.button} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactText} selectable={true}>
          Do not hesitate to contact us if you have any question or feedback at nomoresilence@gmail.com{'\n\n'}Please fell out our feedback{' '}
          <Text style={{ color: 'blue' }} onPress={handleFormLinkPress}>form</Text>.
        </Text>
      </View>

      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={styles.signOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomBar} />
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>Copyright preserved © No More Silence</Text>
      </View>
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
  button: {
    width: 55,
    height: 45,
    resizeMode: 'contain',
  },
  accountButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    left: 10,
    top: 15,
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
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    right: 10,
    top: 15,
  },
  contactContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    backgroundColor: '#E3EFFA',
    paddingVertical: 20,
    paddingHorizontal: 5,
    width: '95%',
    height: 400,
  },
  contactText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'justify',
    lineHeight: 40,
  },
  signOutContainer: {
    position: 'absolute',
    bottom: 80,
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
  },
  bottomBar: {
    width: '100%',
    height: 72,
    backgroundColor: '#052E45',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  copyrightContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 72,
    backgroundColor: '#052E45',
    justifyContent: 'center',
  },
  copyrightText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  }
});

export default Account;
