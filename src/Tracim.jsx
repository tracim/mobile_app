import { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { useTranslation } from 'react-i18next'
import {
  StatusBar,
  TouchableHighlight,
  View
} from 'react-native'
import {
  COLORS,
  IS_SINGLE_SERVER,
  SERVER_NAME,
  SERVER_URL
} from './branding/Config.js'
import { styles } from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from './Webview.jsx'
import MultipleServerMenu from './MultipleServerMenu.jsx'
import SingleServerMenu from './SingleServerMenu.jsx'

export const Tracim = () => {
  const { t } = useTranslation()
  const Drawer = createDrawerNavigator()

  const [serverList, setServerList] = useState([])

  useEffect(() => {
    if (IS_SINGLE_SERVER) {
      setServerList([{ url: SERVER_URL, name: SERVER_NAME }])
    } else getServerList()
  }, [])

  useEffect(() => {
    storeServerList()
  }, [serverList])

  const storeServerList = async () => {
    await AsyncStorage.setItem('serverList', JSON.stringify(serverList))
  }

  const getServerList = async () => {
    const serverListAsJSON = await AsyncStorage.getItem('serverList')
    const serverList = JSON.parse(serverListAsJSON) || []
    setServerList(serverList)
  }

  function HomeScreen ({ navigation }) {
    return (
      <View style={styles.pageContainer}>
        <StatusBar />

        {IS_SINGLE_SERVER
          ? (
            <SingleServerMenu
              onPressServer={navigation.navigate}
            />
          ) : (
            <MultipleServerMenu
              serverList={serverList}
              onPressServer={navigation.navigate}
              onPressAdd={(server) => setServerList([...serverList, server])}
              onPressRemove={(server) => setServerList(serverList.filter(s => s.url !== server.url))}
            />
          )}
      </View>
    )
  }

  function WebViewScreen ({ route, navigation }) {
    return (
      <View style={styles.pageContainer}>
        <StatusBar />
        <WebView
          onClickGoBack={() => navigation.goBack()}
          screenId={route.params.screenId}
          url={route.params.url}
        />
        {!IS_SINGLE_SERVER && (
          <TouchableHighlight
            style={styles.openServerMenuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Icon icon={faServer} />
          </TouchableHighlight>
        )}
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={t('Home')}
        screenOptions={{
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: COLORS.PRIMARY,
          drawerPosition: 'right'
        }}
      >
        <Drawer.Screen
          component={HomeScreen}
          name={t('Home')}
          options={{
            headerShown: false,
            swipeEnabled: !IS_SINGLE_SERVER
          }}
        />
        {serverList.map(server => <Drawer.Screen
          component={WebViewScreen}
          initialParams={{ url: server.url }}
          key={`drawer_${server.name}`}
          name={server.name}
          options={{
            headerShown: false,
            swipeEnabled: !IS_SINGLE_SERVER
          }}
        />)}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default Tracim
