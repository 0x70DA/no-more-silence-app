import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getStorage, ref, listAll} from 'firebase/storage';

const SoundPracticeStack = createNativeStackNavigator();

const Sounds = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    'animal_and_insects_sounds',
    'electric_devices_sounds',
    'human_sounds',
    'nature_sounds',
    'public_sounds',
    'public_transport_sounds',
  ];

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
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get sub-options for the selected option
  const storage = getStorage();
  // Create a reference
  const listRef = ref(storage, `sounds/${option}`);

  // Find all the sub-options.
  const subOptionsList = [];
  listAll(listRef)
    .then(res => {
      res.prefixes.forEach(folderRef => {
        // All the prefixes under listRef.
        subOptionsList.push(
          folderRef.name
            .split('_')
            .map(word => {
              return word[0].toUpperCase() + word.slice(1);
            })
            .join(' '),
        );
      });
      setSubOptions(subOptionsList);
      setLoading(true);
    })
    .catch(error => {
      console.log(error);
    });

  const handleSubOptionPress = subOption => {
    navigation.navigate('DetailScreen', {subOption});
  };

  // Filter sub-options based on the search query
  const filteredSubOptions = subOptions.filter(subOption =>
    subOption.toLowerCase().startsWith(searchQuery.toLowerCase()),
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
        placeholder="Search Sounds"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {loading ? (
        <ScrollView
          style={{padding: 10, overflow: 'scroll', marginBottom: 100}}>
          {filteredSubOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subOptionButton}
              onPress={() => handleSubOptionPress(item)}>
              <Text style={styles.optionText}>
                {item
                  .split('_')
                  .map(word => {
                    return word[0].toUpperCase() + word.slice(1);
                  })
                  .join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator
            size="45"
            color="#000000"
            style={{marginTop: 100}}
          />
          <Text style={{padding: 5, marginLeft: 10}}>Loading...</Text>
        </View>
      )}
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
    <SoundPracticeStack.Navigator initialRouteName="Sounds">
      <SoundPracticeStack.Screen
        name="Sounds"
        component={Sounds}
        options={{headerShown: false}}
      />
      <SoundPracticeStack.Screen
        name="SubOptions"
        component={SubOptionsScreen}
        options={{headerShown: false}}
      />
      <SoundPracticeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </SoundPracticeStack.Navigator>
  );
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
    backgroundColor: '#D9D9D9',
    width: 351,
    height: 73,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    width: '90%',
  },
});

export default SoundPractice;
