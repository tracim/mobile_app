import { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import {
  StatusBar,
  TouchableHighlight,
  View
} from 'react-native'
import { styles } from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from './Webview.js'
import ServerMenu from './ServerMenu.js'
import Colors from './branding/Colors.js'

export const Tracim = () => {
  const [serverList, setServerList] = useState([])
  const Drawer = createDrawerNavigator()

  useEffect(() => {
    getServerList()
  }, [])

  useEffect(() => {
    storeServerList()
  }, [serverList])

  const storeServerList = async () => {
    await AsyncStorage.setItem('serverList', JSON.stringify(serverList))
  }

  const getServerList = async () => {
    const serverListAsJSON = await AsyncStorage.getItem('serverList')
    const serverList = JSON.parse(serverListAsJSON)
    setServerList(serverList)
  }

  function HomeScreen ({ navigation }) {
    return (
      <View style={styles.pageContainer}>
        <StatusBar />

        <ServerMenu
          serverList={serverList}
          onPressServer={navigation.navigate}
          onPressAdd={(server) => setServerList([...serverList, server])}
          onPressRemove={(server) => setServerList(serverList.filter(s => s.url !== server.url))}
        />
      </View>
    )
  }

  function WebViewScreen ({ route, navigation }) {
    return (
      <View style={styles.pageContainer}>
        <StatusBar />
        <WebView
          onClickGoBack={() => navigation.goBack()}
          url={route.params.url}
        />
        <TouchableHighlight
          style={styles.openServerMenuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon icon={faServer} />
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Home'
        screenOptions={{
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerPosition: 'right'
        }}
      >
        <Drawer.Screen
          component={HomeScreen}
          name='Home'
          options={{ headerShown: false }}
        />
        {serverList.map(server => <Drawer.Screen
          component={WebViewScreen}
          initialParams={{ url: server.url }}
          key={`drawer_${server.name}`}
          name={server.name}
          options={{ headerShown: false }}
        />)}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default Tracim
