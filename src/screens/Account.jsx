import React from 'react';
import {View, Text, Button} from 'react-native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

const Account = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default Account;
