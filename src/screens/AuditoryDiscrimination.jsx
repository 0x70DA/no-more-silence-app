import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useTrackPlayerEvents, usePlaybackState } from 'react-native-track-player';
import TrackPlayer, { State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import files from '../../assets/auditory';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [language, setLanguage] = useState('en');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

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

  useEffect(() => {
    getNextQuestion();
    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) setIsTimerRunning(false); // Stop the timer when it reaches zero
        return prevTimer === 0 ? 0 : prevTimer - 1;
      });
    }, 1000);

    // Clean up player when component unmounts.
    return () => {
      const resetPlayer = async () => {
        await TrackPlayer.reset();
      };
      resetPlayer();
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer === 0) {
      handleQuizEnd();
    }
  }, [isTimerRunning, timer]);

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
    setTimer(60);
    setIsTimerRunning(true);

    let currentScore = score;
    if (firstTry) {
      currentScore += 1;
      setScore(currentScore);
    }

    if (allQuestions.length === 0) {
      handleQuizEnd();
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
    setIsTimerRunning(false);

    if (image === files[`${currentQuestion}/right`]) {
      stopPlayer();
      Alert.alert(language === 'en' ? 'Correct! 🎉' : 'صحيح! 🎉', '', [
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
    Alert.alert(language === 'en' ? 'Try again! 🤔' : 'حاول مرة أخرى! 🤔');
  };

  const handleQuizEnd = () => {
    stopPlayer();
    Alert.alert(
      language === 'en' ? 'Quiz Ended' : 'انتهى الاختبار',
      language === 'en' ? `Your final score is ${score}.` : `الدرجة النهائية ${score}.`,
      [
        {
          text: language === 'en' ? 'Retake Quiz' : 'إعادة الاختبار',
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }, { name: 'AuditoryDiscrimination' }],
              })
            ),
        },
        {
          text: language === 'en' ? 'Return Home' : 'العودة إلى الصفحة الرئيسية',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
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
          <Text style={styles.screenTitleText}>{language === 'en' ? 'Auditory Discrimination\nActivity' : 'نشاط التمييز\nالسمعي'}</Text>
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {language === 'en' ? 'Score' : 'الدرجة'}{`: ${score}`}/{Object.keys(questionsMapping).length}
            </Text>
            <Text style={styles.statsText}>
              {language === 'en' ? 'Remaining Questions' : 'الأسئلة المتبقية'}: {allQuestions.length}
            </Text>
            <Text style={styles.statsText}>
              {language === 'en' ? 'Time Remaining' : 'الوقت المتبقي'}: {formatTime(timer)}
            </Text>
            <Text style={[styles.statsText, { top: 40 }]}>{language === 'en' ? 'Select the correct image:' : 'اختر الصورة الصحيحة:'}</Text>
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
        </ScrollView>
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
    paddingHorizontal: 10,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  accountButton: {
    top: 10,
  },
  screenTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    paddingVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  playButton: {
    alignSelf: 'center',
    paddingTop: '5%',
    top: '55%',
  },
  progressBarContainer: {
    width: '300%',
    alignSelf: 'center',
    top: '50%',
  },
  progressBarText: {
    textAlign: 'center',
    paddingTop: '3%',
    color: 'black',
    top: '55%',
    fontSize: 14,
  },
  statsContainer: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: '15%',
    justifyContent: 'space-around',
  },
  image: {
    width: '50%',
    height: '50%',
    aspectRatio: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'grey',
    margin: '2%',
  },
});

export default AuditoryDiscrimination;
