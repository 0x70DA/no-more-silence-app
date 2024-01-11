import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

const AudioSetup = ({children}) => {
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };

    setupPlayer();
  }, []);

  return <>{children}</>;
};

export default AudioSetup;
