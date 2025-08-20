/**
 * @format
 */

import { AppRegistry } from 'react-native'
import TracimWrapper from './src/Tracim.jsx'
import { name as appName } from './app.json'
import './i18next.scanner/i18n.js'

AppRegistry.registerComponent(appName, () => TracimWrapper)
