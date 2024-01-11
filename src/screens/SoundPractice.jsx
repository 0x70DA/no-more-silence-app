import React, { useState, useEffect } from 'react';
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
import TrackPlayer, { usePlaybackState, useTrackPlayerEvents, State } from 'react-native-track-player';
import ProgressBar from 'react-native-progress/Bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import files from '../../assets/sounds/index';

const SoundPracticeStack = createNativeStackNavigator();
const soundsMapping = require('../sounds_mapping.json');
const sounds = [
  'animal_and_insects_sounds',
  'electric_devices_sounds',
  'human_sounds',
  'nature_sounds',
  'public_sounds',
  'public_transport_sounds',
];


const Sounds = ({ navigation }) => {
  const [selectedSound, setSelectedSound] = useState(null);

  const handleSoundPress = sound => {
    setSelectedSound(sound);
    navigation.navigate('SubSounds', { sound });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      {sounds.map((sound, index) => (
        <TouchableOpacity
          key={index}
          style={styles.soundButton}
          onPress={() => handleSoundPress(sound)}>
          <Text style={styles.soundText}>
            {sound.split('_').map(word => {
              return word[0].toUpperCase() + word.slice(1);
            })
              .join(' ')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SubSoundsScreen = ({ route, navigation }) => {
  const { sound } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [subSounds, setSubSounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const subSoundsList = [];
    for (const subSound in soundsMapping[sound]) {
      subSoundsList.push(Object.keys(soundsMapping[sound][subSound])[0]);
    }
    setSubSounds(subSoundsList);
    setLoading(false);
  }, [sound]);


  const handleSubSoundPress = subSound => {
    navigation.navigate('PlaySoundScreen', { sound, subSound });
  };

  // Filter sub-options based on the search query
  const filteredSubSounds = subSounds.filter(subSound =>
    subSound.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
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
      {!loading ? (
        <ScrollView
          style={{ padding: 10, overflow: 'scroll', marginBottom: 100 }}>
          {filteredSubSounds.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subSoundButton}
              onPress={() => handleSubSoundPress(item)}>
              <Text style={styles.soundText}>
                {item.split('_').map(word => {
                  return word[0].toUpperCase() + word.slice(1);
                }).join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator size="45" color="black" style={{ marginTop: 100 }} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};


const PlaySoundScreen = ({ route, navigation }) => {
  const { sound, subSound } = route.params;
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const playbackState = usePlaybackState();

  useEffect(() => {
    setLoading(true);

    for (const item in soundsMapping[sound]) {
      if (Object.keys(soundsMapping[sound][item])[0] === subSound) {
        setAudio(Object.values(soundsMapping[sound][item])[0]["audio"]);
        setImages(Object.values(soundsMapping[sound][item])[0]["images"]);
        break;
      }
    }

    // setLoading(false);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await TrackPlayer.add({
        id: 'audio',
        url: files[`${sound}/${subSound}/${audio}`],
      });
      setLoading(false);
    };

    if (audio.length > 0) {
      initialize();
    }

  }, [audio]);

  useEffect(() => {
    // Clean up player when component unmounts.
    return () => {
      const stopPlayer = async () => {
        await TrackPlayer.reset();
      };
      stopPlayer();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (playbackState.state === State.Playing) {
        const position = await TrackPlayer.getProgress().then((progress) => progress.position);
        const currentDuration = await TrackPlayer.getProgress().then((progress) => progress.duration);
        const percentage = (position / currentDuration) * 100;
        setProgress(percentage);
        setDuration(currentDuration);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playbackState]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Listen for the track playback end event
  useTrackPlayerEvents(['playback-queue-ended'], async () => {
    setProgress(0);
    setIsPlaying(false);

    await TrackPlayer.seekTo(0);
    await TrackPlayer.pause();
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={{ backgroundColor: '' }}
          onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../assets/account.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      {!loading ? (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handlePrevImage} style={styles.arrowButton}>
              <Image source={require('../../assets/left_arrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image source={files[`${sound}/${subSound}/${images[currentImageIndex]}`]} style={styles.image} />
            </View>
            <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
              <Image source={require('../../assets/right_arrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <ProgressBar progress={progress / 100} borderWidth={0} width={null} color={'#052E45'} unfilledColor={'#999993'} />
          </View>

          <Text style={styles.progressBarText}>
            {formatTime(progress * (duration / 100))}
            {' / '}
            {formatTime(duration)}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
            <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="45" color="black" style={{ marginTop: 100 }} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const SoundPractice = () => {
  return (
    <SoundPracticeStack.Navigator initialRouteName="Sounds">
      <SoundPracticeStack.Screen
        name="Sounds"
        component={Sounds}
        options={{ headerShown: false }}
      />
      <SoundPracticeStack.Screen
        name="SubSounds"
        component={SubSoundsScreen}
        options={{ headerShown: false }}
      />
      <SoundPracticeStack.Screen
        name="PlaySoundScreen"
        component={PlaySoundScreen}
        options={{ headerShown: false }}
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
  soundButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#D9D9D9',
    width: 351,
    height: 73,
  },
  soundText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '800',
    textAlign: 'center',
    padding: 10,
  },
  loadingText: {
    padding: 5,
    marginLeft: 10,
    color: 'black'
  },
  subSoundButton: {
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
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 350,
    marginTop: 25,
    borderRadius: 39,
    borderColor: 'grey',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  arrowButton: {
    padding: 10,
    position: 'relative',
    top: 170,
  },
  arrowIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'relative',
    marginHorizontal: -15,
  },
  progressBarContainer: {
    width: 350,
    paddingTop: 20,
    alignSelf: 'center',
  },
  progressBarText: {
    textAlign: 'center',
    paddingTop: 10,
    color: 'black',
  },
});

export default SoundPractice;
