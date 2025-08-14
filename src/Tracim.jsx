import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
// import { useTranslation } from 'react-i18next'
import {
  COLORS,
  IS_SINGLE_SERVER,
  SERVER_NAME,
  SERVER_URL
} from './branding/Config.js'
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
      setServerList([{ url: SERVER_URL, name: SERVER_NAME, iconB64: '' }])
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
    (!IS_SINGLE_SERVER || serverList.length > 0) && (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={IS_SINGLE_SERVER ? serverList[0].name : 'Home'}
          screenOptions={{
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: COLORS.PRIMARY,
            drawerPosition: 'right'
          }}
        >
          <Drawer.Screen
            name={'Home'}
            component={HomeScreen}
            options={{
              headerShown: false,
              swipeEnabled: !IS_SINGLE_SERVER
            }}
          />

          {serverList.map(server => (
            <Drawer.Screen
              name={server.name}
              component={ServerScreen}
              initialParams={{ server: server }}
              options={{
                headerShown: false,
                swipeEnabled: !IS_SINGLE_SERVER
              }}
              key={`drawer_${server.name}`}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  )
}
