/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AudioSetup from './AudioSetup';
import TrackPlayer from 'react-native-track-player';

const RootComponent = () => (
  <AudioSetup>
    <App />
  </AudioSetup>
);

AppRegistry.registerComponent(appName, () => RootComponent);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
