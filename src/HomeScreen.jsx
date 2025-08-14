import { useState } from 'react'
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


function HomeScreen (props) {
  const { t } = useTranslation()
  const [displayCreateNewServerModal, setDisplayCreateNewServerModal] = useState(false)

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
