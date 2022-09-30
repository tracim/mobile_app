import { useEffect, useState } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { styles } from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from './Webview.js'
import ServerMenu from './ServerMenu.js'

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

  function WebViewScreen ({ route }) {
    return (
      <View style={styles.pageContainer}>
        <StatusBar />
        <WebView url={route.params.url} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ drawerPosition: 'right' }}
        initialRouteName='Home'
      >
        <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        {serverList.map(server => <Drawer.Screen
          key={`drawer_${server.name}`}
          name={server.name}
          component={WebViewScreen}
          options={{headerShown: false}}
          initialParams={{ url: server.url }}
        />)}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default Tracim
