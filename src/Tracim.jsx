import { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  StatusBar,
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
import MultipleServerMenu from './MultipleServerMenu.jsx'
import ServerScreen from './ServerScreen.jsx'

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
        <MultipleServerMenu
          serverList={serverList}
          onPressServer={(server) => { navigation.navigate(server.name) }}
          onPressAdd={(server) => setServerList([...serverList, server])}
          onPressRemove={(server) => setServerList(serverList.filter(s => s.url !== server.url))}
        />
      </View>
    )
  }

  return (
    (!IS_SINGLE_SERVER || serverList.length > 0) && (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={IS_SINGLE_SERVER ? serverList[0].name : t('Home')}
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
          {serverList.map(server => (
            <Drawer.Screen
              component={ServerScreen}
              initialParams={{ server: server }}
              key={`drawer_${server.name}`}
              name={server.name}
              options={{
                headerShown: false,
                swipeEnabled: !IS_SINGLE_SERVER
              }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  )
}
export default Tracim
