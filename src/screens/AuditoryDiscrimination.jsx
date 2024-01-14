import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useTrackPlayerEvents, usePlaybackState } from 'react-native-track-player';
import TrackPlayer, { State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import files from '../../assets/auditory';


const questionsMapping = require('../questions_mapping.json');

const AuditoryDiscrimination = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [allQuestions, setAllQuestions] = useState(Object.keys(questionsMapping));
  const [imagePairs, setImagePairs] = useState([]);
  const [score, setScore] = useState(0);
  const [firstTry, setFirstTry] = useState(false);
  const playbackState = usePlaybackState();

  useEffect(() => {
    getNextQuestion();

    // Clean up player when component unmounts.
    return () => {
      const resetPlayer = async () => {
        await TrackPlayer.reset();
      };
      resetPlayer();
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    const initializePlayer = async () => {
      await TrackPlayer.add({
        id: 'question',
        url: files[`${currentQuestion}/audio`],
      });
    };

    if (currentQuestion && imagePairs.length > 0) {
      initializePlayer();
      setLoading(false);
    }

  }, [currentQuestion]);

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

  const getNextQuestion = async () => {
    let currentScore = score;
    if (firstTry) {
      currentScore += 1;
      setScore(currentScore);
    }

    if (allQuestions.length === 0) {
      stopPlayer();
      await TrackPlayer.reset();

      Alert.alert('Quiz Complete! 👏', `Your final score is ${currentScore}.`, [
        {
          text: 'Retake Quiz',
          onPress: () => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home' },
                { name: 'AuditoryDiscrimination' },
              ],
            }),
          ),
        },
        {
          text: 'Return Home',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } else {
      stopPlayer();
      await TrackPlayer.reset();

      const question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      // Remove the question from the list of questions
      allQuestions.splice(allQuestions.indexOf(question), 1);

      const images = [files[`${question}/right`], files[`${question}/wrong`]].sort(() => Math.random() - 0.5);
      setImagePairs(images);
      setCurrentQuestion(question);
      setFirstTry(true);
    }
  };

  const handleImagePress = async (image) => {
    if (image === files[`${currentQuestion}/right`]) {
      stopPlayer();
      Alert.alert('Correct! 🎉', '', [
        {
          text: 'OK',
          onPress: () => getNextQuestion(),
        },
      ]);
      return;
    }
    await TrackPlayer.pause();
    setIsPlaying(false);
    setFirstTry(false);
    Alert.alert('Try again! 🤔');
  };

  const stopPlayer = async () => {
    await TrackPlayer.pause();
    await TrackPlayer.seekTo(0);
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);
  }

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
    stopPlayer();
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText}>Auditory Discrimination{'\n'}Activity</Text>
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

      {loading ? (
        <View style={{}}>
          <ActivityIndicator size="45" color="#052E45" />
        </View>
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {`Score: ${score}`}/{Object.keys(questionsMapping).length}
            </Text>
            <Text style={styles.statsText}>
              Remaining Questions: {allQuestions.length}
            </Text>
          </View>

          {imagePairs.length > 0 && (
            <View style={styles.imagesContainer}>
              <TouchableOpacity onPress={() => handleImagePress(imagePairs[0])} >
                <Image source={imagePairs[0]} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleImagePress(imagePairs[1])}>
                <Image source={imagePairs[1]} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}

          <View style={{ position: 'absolute', bottom: 150, alignSelf: 'center' }}>
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
    left: 15,
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
  statsContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 100,
  },
  statsText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 250,
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default AuditoryDiscrimination;
