/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Tracim from './src/Tracim.jsx';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Tracim);
