import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
// import { useTranslation } from 'react-i18next'
import {
  COLORS,
  IS_SINGLE_SERVER,
  SERVER_B64_ICON,
  SERVER_NAME,
  SERVER_URL
} from '../assets/branding/Config.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ServerListProvider,
  useServerList
} from './ServerListContext.js'
import HomeScreen from './HomeScreen.jsx'
import ServerScreen from './ServerScreen.jsx'

export const TracimWrapper = () => {
  return (
    <ServerListProvider>
      <GestureHandlerRootView>
        <Tracim />
      </GestureHandlerRootView>
    </ServerListProvider>
  )
}
export default TracimWrapper

const Tracim = () => {
  // const { t } = useTranslation()
  const Drawer = createDrawerNavigator()
  const [serverList, setServerList] = useServerList()

  useEffect(() => {
    if (IS_SINGLE_SERVER) {
      setServerList([{
        url: SERVER_URL,
        name: SERVER_NAME,
        iconB64: SERVER_B64_ICON
      }])
    } else {
      getServerList()
    }
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: COLORS.PRIMARY,
            drawerPosition: 'right'
          }}
        >
          <Drawer.Screen
            name={'Home'}
            component={HomeScreen}
            initialParams={{ allowRedirect: true }}
            options={{
              headerShown: false,
              swipeEnabled: !IS_SINGLE_SERVER
            }}
          />

          {serverList.map(server => (
            <Drawer.Screen
              name={server.url}
              component={ServerScreen}
              options={{
                drawerLabel: server.name,
                headerShown: false,
                swipeEnabled: !IS_SINGLE_SERVER
              }}
              key={`drawer_${server.url}`}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
