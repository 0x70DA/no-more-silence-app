import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_WEB_CLIENT_ID } from '@env';


const Login = () => {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userInfo = await GoogleSignin.signIn();
      // Create a credential with the Google ID token
      const credential = GoogleAuthProvider.credential(userInfo.idToken);
      // Sign in with Firebase using the credential
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
    setLoading(false);
  };


  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert('Login Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      alert('Sign Up Success!');
    } catch (err) {
      alert('Sign Up Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <View style={styles.blueRectangle} />

          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>{language==='en' ? 'Login / Sign Up' : 'التسجيل / الدخول'}</Text>
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.buttonText}>continue with google</Text>
              <Image
                source={require('../../assets/google_icon.png')}
                style={{
                  width: 37,
                  height: 36,
                  position: 'relative',
                  left: '25%',
                }}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <Text style={styles.orText}>{language==='en' ? 'or' : 'أو'}</Text>
          </View>

          <View style={styles.emailTextContainer}>
            <Text style={styles.emailText}>{language==='en' ? 'Email' : 'الإيميل'}</Text>
            <TextInput
              value={email}
              style={styles.emailInput}
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}></TextInput>
          </View>

          <View style={styles.passwordTextContainer}>
            <Text style={styles.passwordText}>{language==='en' ? 'Password' : 'كلمة المرور'}</Text>
            <TextInput
              value={password}
              style={styles.passwordInput}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}></TextInput>
          </View>

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="45" color="#052E45" />
            </View>
          ) : (
            <View>
              <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                <Text style={styles.buttonText}>{language==='en' ? 'Sign Up' : 'التسجيل'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                <Text style={styles.buttonText}>{language==='en' ? 'Login' : 'الدخول'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundContainer: {
    width: '95%',
    aspectRatio: 429 / 800,
    position: 'relative',
  },
  blueRectangle: {
    position: 'absolute',
    left: '10%',
    borderRadius: 10,
    top: '15%',
    width: '90%',
    height: '75%',
    backgroundColor: '#E3EFFA',
  },
  signUpTextContainer: {
    position: 'absolute',
    left: '15%',
    top: '23%',
  },
  signUpText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  googleButton: {
    position: 'absolute',
    left: '13%',
    top: '34%',
    width: '80%',
    height: '7%',
    backgroundColor: '#F97B7B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  orContainer: {
    position: 'absolute',
    left: '46%',
    top: '47%',
  },
  orText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  emailTextContainer: {
    position: 'absolute',
    left: '15%',
    top: '55%',
  },
  emailText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  passwordTextContainer: {
    position: 'absolute',
    left: '15%',
    top: '70%',
  },
  passwordText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  emailInput: {
    position: 'absolute',
    left: '2%',
    top: '120%',
    width: '370%',
    height: '120%',
    backgroundColor: '#fff',
  },
  passwordInput: {
    position: 'absolute',
    left: '2%',
    top: '120%',
    width: '210%',
    height: '125%',
    backgroundColor: 'white',
  },
  loginButton: {
    position: 'relative',
    left: '20%',
    top: '228%',
    width: '30%',
    height: '17%',
    borderRadius: 10,
    backgroundColor: '#052E45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    position: 'relative',
    left: '55%',
    top: '245%',
    width: '30%',
    height: '17%',
    borderRadius: 10,
    backgroundColor: '#052E45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  loading: {
    position: 'absolute',
    left: '43%',
    top: '81%',
  },
});

export default Login;
