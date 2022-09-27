import { useEffect, useState } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import WebView from './Webview.js'
import ServerMenu from './ServerMenu.js'

const serverListConfig = require('../server_list.json')

export const Tracim = () => {
  const [serverList, setServerList] = useState([])
  const Drawer = createDrawerNavigator()

  useEffect(() => {
    setServerList(serverListConfig.server)
  }, [serverListConfig])

  function HomeScreen ({ navigation }) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />

        {serverList.length > 0
          ? (
            <ServerMenu
              serverList={serverList}
              onPressServer={navigation.navigate}
              onPressAdd={(server) => setServerList([...serverList, server])}
            />
          )
          : <Text> Error: Empty server list </Text>
        }
      </View>
    )
  }

  function WebViewScreen ({ route }) {
    return (
      <View style={{ flex: 1 }}>
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
