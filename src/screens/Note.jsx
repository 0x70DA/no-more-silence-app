import React from 'react';
import { View, Text, Button } from 'react-native';

const Note = ({ navigation }) => {
    return (
        <View>
            <Text>Hello, world!</Text>
            <Button title="got it" onPress={() => navigation.navigate("Login")}/>
        </View>
    );
};

export default Note;
