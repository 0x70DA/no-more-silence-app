import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useTrackPlayerEvents, usePlaybackState } from 'react-native-track-player';
import TrackPlayer, { State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import files from '../../../assets/sounds';
import AsyncStorage from '@react-native-async-storage/async-storage';

const en = require('../../locales/en/sounds.json');
const ar = require('../../locales/ar/sounds.json');
const soundsMapping = require('../../sounds_mapping.json');

const PlaySoundScreen = ({ route, navigation }) => {
  const { sound, subSound, identificationType } = route.params;
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const playbackState = usePlaybackState();
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState(null);

  useEffect(() => {
    // Get current app language
    const getLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem('language');
        if (lang !== null) {
          setLanguage(lang);
          setText(lang === 'en' ? en : ar);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLanguage();
  }, []);

  useEffect(() => {
    setLoading(true);

    for (const item in soundsMapping[sound]) {
      if (Object.keys(soundsMapping[sound][item])[0] === subSound) {
        setAudio(Object.values(soundsMapping[sound][item])[0]["audio"]);
        setImages(Object.values(soundsMapping[sound][item])[0]["images"]);
        break;
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await TrackPlayer.add({
        id: 'audio',
        url: files[`${sound}/${subSound}/${audio}`],
      });
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
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>
            {text && text[sound].split(' ').slice(0, -1).join(' ') + '\n' + text[sound].split(' ').slice(-1)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.accountButton, { marginRight: 30 }]} onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} >
            <Icon name="home" size={30} color="white" onPress={() => navigation.navigate('Home')} />
          </TouchableOpacity>
        </View>
      </View>

      {!loading && text ? (
        <View style={{ position: 'absolute', top: 90 }}>
          <View style={styles.soundTitleContainer}>
            <Text style={styles.soundTitleText}>
              {text[subSound]}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handlePrevImage} style={styles.arrowButton}>
              <Image source={require('../../../assets/left_arrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image source={files[`${sound}/${subSound}/${images[currentImageIndex]}`]} style={styles.image} />
            </View>
            <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
              <Image source={require('../../../assets/right_arrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {audio.length === 0 ? (
            <View style={{ marginTop: 25 }}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                {language === 'en' ? 'No audio file found!' : 'لم يتم العثور على ملف صوتي!'}
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={progress / 100} borderWidth={0} width={null} height={8} color={'#052E45'} unfilledColor={'#999993'} />
              </View>

              <Text style={styles.progressBarText}>
                {formatTime(progress * (duration / 100))}
                {' / '}
                {formatTime(duration)}
              </Text>

              <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                <Icon name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'} size={80} color="#052E45" />
              </TouchableOpacity>
            </View>
          )}
          {identificationType === 'direction' &&
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{text.directionOfSound}</Text>
            </View>}
          {identificationType === 'existence' &&
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{text.existenceOfSound}</Text>
            </View>}
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
  accountButton: {
    left: 5,
    top: 25,
    position: 'relative',
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
    right: 10,
    top: 15,
    position: 'relative',
    padding: 10,
  },
  soundTitleContainer: {
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    width: 350,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  soundTitleText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loadingText: {
    padding: 5,
    marginLeft: 10,
    color: 'black'
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
    marginHorizontal: -5,
  },
  playButton: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  progressBarContainer: {
    width: 350,
    paddingTop: 20,
    alignSelf: 'center',
  },
  progressBarText: {
    textAlign: 'center',
    paddingTop: 15,
    color: 'black',
    fontSize: 18,
  },
  noteContainer: {
    marginTop: 10,
    backgroundColor: '#E3EFFA',
    width: '100%',
    height: 155,
    padding: 10,
    justifyContent: 'center',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PlaySoundScreen;