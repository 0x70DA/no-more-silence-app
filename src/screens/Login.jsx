import React, {useState} from 'react';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (err) {
      console.log(err);
      alert('Login Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      alert('Sign Up Success!');
    } catch (err) {
      console.log(err);
      alert('Sign Up Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.backgroundContainer}>
            <View style={styles.blueRectangle} />

            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>Login/Sign Up</Text>
            </View>
            {/* TODO */}
            <TouchableOpacity style={styles.googleButton}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.buttonText}>continue with google</Text>
                <Image
                  source={require('../../assets/google_icon.png')}
                  style={{
                    width: 37,
                    height: 36,
                    position: 'relative',
                    left: 35,
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.facebookButton}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.buttonText}>continue with facebook</Text>
                <Image
                  source={require('../../assets/facebook_icon.png')}
                  style={{
                    width: 61,
                    height: 36,
                    position: 'relative',
                    left: 24,
                  }}
                />
              </View>
            </TouchableOpacity>
            {/* TODO */}
            <View style={styles.orContainer}>
              <Text style={styles.orText}>or</Text>
            </View>

            <View style={styles.emailTextContainer}>
              <Text style={styles.emailText}>Email</Text>
              <TextInput
                value={email}
                style={styles.emailInput}
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}></TextInput>
            </View>

            <View style={styles.passwordTextContainer}>
              <Text style={styles.passwordText}>Password</Text>
              <TextInput
                value={password}
                style={styles.passwordInput}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}></TextInput>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                  <Text style={styles.buttonText}>sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: 429,
    height: 926,
    backgroundColor: 'white',
    position: 'relative',
  },
  blueRectangle: {
    position: 'absolute',
    left: 17,
    borderRadius: 10,
    top: 138,
    width: 381,
    height: 592,
    backgroundColor: '#E3EFFA',
  },
  signUpTextContainer: {
    position: 'absolute',
    left: 61,
    top: 184,
  },
  signUpText: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  googleButton: {
    position: 'absolute',
    left: 33,
    top: 276,
    width: 329,
    height: 38,
    backgroundColor: '#F97B7B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButton: {
    position: 'absolute',
    left: 33,
    top: 337,
    width: 329,
    borderRadius: 10,
    height: 38,
    backgroundColor: '#429AF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  orContainer: {
    position: 'absolute',
    left: 196,
    top: 421,
  },
  orText: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  emailTextContainer: {
    position: 'absolute',
    left: 33,
    top: 463,
  },
  emailText: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  passwordTextContainer: {
    position: 'absolute',
    left: 33,
    top: 550,
  },
  passwordText: {
    color: 'black',
    fontSize: 24,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
  emailInput: {
    position: 'absolute',
    left: 9,
    top: 38,
    width: 303,
    height: 40,
    backgroundColor: '#fff',
  },
  passwordInput: {
    position: 'absolute',
    left: 9,
    top: 38,
    width: 303,
    height: 40,
    backgroundColor: 'white',
  },
  loginButton: {
    position: 'absolute',
    left: 110,
    top: 654,
    width: 120,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#052E45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    position: 'absolute',
    left: 242,
    top: 654,
    width: 120,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#052E45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '800',
    lineHeight: 30,
  },
});

export default Login;
