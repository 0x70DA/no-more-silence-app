import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from './Account';

const Stack = createNativeStackNavigator();

const Sounds = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = option => {
    setSelectedOption(option);
    navigation.navigate('SubOptions', {option});
  };

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
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleOptionPress(option)}>
          <Text style={styles.optionText}>
            {option
              .split('_')
              .map(word => {
                return word[0].toUpperCase() + word.slice(1);
              })
              .join(' ')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SubOptionsScreen = ({route, navigation}) => {
  const {option} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const subOptions = optionsWithSubOptions[option];

  const handleSubOptionPress = subOption => {
    navigation.navigate('DetailScreen', {subOption});
  };

  // Filter sub-options based on the search query
  const filteredSubOptions = subOptions.filter(subOption =>
    subOption.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
      <TextInput
        style={styles.searchBar}
        placeholder="Search Sub Options"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredSubOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={styles.subOptionButton}
            onPress={() => handleSubOptionPress(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DetailScreen = ({route}) => {
  const {subOption} = route.params;

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
      <Text>{`Detail Screen: ${subOption}`}</Text>
    </View>
  );
};

const SoundPractice = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Sounds">
        <Stack.Screen
          name="Sounds"
          component={Sounds}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubOptions"
          component={SubOptionsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = [
  'animal_&_insects_sounds',
  'electric_devices_sounds',
  'human_sounds',
  'nature_sounds',
  'public_sounds',
  'public_transport_sounds',
];

const optionsWithSubOptions = {
  'animal_&_insects_sounds': [
    'Sub Option 1.1',
    'Sub Option 1.2',
    'Sub Option 1.3',
  ],
  electric_devices_sounds: [
    'Sub Option 2.1',
    'Sub Option 2.2',
    'Sub Option 2.3',
  ],
  human_sounds: ['Sub Option 3.1', 'Sub Option 3.2', 'Sub Option 3.3'],
  nature_sounds: ['Sub Option 3.1', 'Sub Option 3.2', 'Sub Option 3.3'],
  public_sounds: ['Sub Option 3.1', 'Sub Option 3.2', 'Sub Option 3.3'],
  public_transport_sounds: [
    'Sub Option 3.1',
    'Sub Option 3.2',
    'Sub Option 3.3',
  ],
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
  optionButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#D9D9D9',
    width: 351,
    height: 73,
  },
  optionText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '800',
    textAlign: 'center',
    padding: 10,
  },
  subOptionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '80%',
  },
});

export default SoundPractice;
