import { useState, useEffect } from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity as Button
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { styles } from './styles.js'
import ServerList from './ServerList.jsx'
import SetServerModal from './modals/SetServerModal.jsx'
import { useServerList } from './ServerListContext.js'

function HomeScreen (props) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [serverList, setServerList] = useServerList()
  const routes = useNavigationState(state => state.routes)
  const [displayCreateNewServerModal, setDisplayCreateNewServerModal] = useState(false)

  useEffect(() => {
    const allowRedirectToServer = props.route.params?.allowRedirect === true

    if (allowRedirectToServer && routes.length === 1 && serverList.length === 1) {
      navigation.navigate(serverList[0].url)
    }
  }, [serverList])

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle='default' />

      <ServerList />

      <SetServerModal
        isCreate={true}
        modalVisible={displayCreateNewServerModal}
        hideModal={() => setDisplayCreateNewServerModal(false)}
        showCloseButton
      />

      <Button
        onPress={() => setDisplayCreateNewServerModal(true)}
        style={[styles.button, styles.addNewServerButton]}
      >
        <Text style={styles.buttonText}>
          {t('ADD A NEW SERVER')}
        </Text>
      </Button>
    </View>
  )
}
export default HomeScreen
