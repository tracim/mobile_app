import { useContext } from 'react'
import {
  StatusBar,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles.js'
import MultipleServerMenu from './MultipleServerMenu.jsx'
import {ServerListContext} from './Tracim.jsx'


function HomeScreen (props) {
  const navigation = useNavigation()
  const [serverList, setServerList] = useContext(ServerListContext)

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle='default' />
      <MultipleServerMenu
        serverList={serverList}
        onPressServer={(server) => { navigation.navigate(server.name) }}
        onPressAdd={(server) => setServerList([...serverList, server])}
        onPressRemove={(server) => setServerList(serverList.filter(s => s.url !== server.url))}
      />
    </View>
  )
}
export default HomeScreen
