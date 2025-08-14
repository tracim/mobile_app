import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity as Button
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { removeCredentials } from './authentificationHelper.js'
import { styles } from './styles.js'
import { useServerList } from './ServerListContext.js'
import { SetServerModal } from './modals/SetServerModal.jsx'

export const ServerList = (props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [serverList, setServerList] = useServerList()
  const [showUpdateServerModal, setShowUpdateServerModal] = useState(false)
  const [serverToUpdate, setServerToUpdate] = useState(null)

  return (
    <SafeAreaView style={styles.pageContainer}>
      {showUpdateServerModal && (
        <SetServerModal
          isCreate={false}
          serverToUpdate={serverToUpdate}
          modalVisible={showUpdateServerModal}
          hideModal={() => setShowUpdateServerModal(false)}
          showCloseButton
        />
      )}

      <Image
        source={require('./branding/logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />

      {serverList.length > 0 ? (
        <ScrollView>
          {serverList.map(server =>
            <View
              style={styles.serverMenuItem}
              key={`button_${server.name}`}
            >
              <Button
                style={[styles.button, styles.serverButton]}
                onPress={() => navigation.navigate(server.name)}
                onLongPress={() => {
                  removeCredentials(server.url)
                }}
              >
                <Image
                  style={styles.buttonServerIcon}
                  source={{ uri: server.iconB64 }}
                />
                <Text style={[styles.buttonText]}>
                  {server.name}
                </Text>
              </Button>

              <Button
                style={[styles.button, { marginEnd: 10 }]}
                onPress={() => {
                  setShowUpdateServerModal(true)
                  setServerToUpdate(server)
                }}
              >
                <Icon
                  accessibilityLabel={t('Update {{serverName}}', { serverName: server.name })}
                  icon={faPenToSquare}
                  style={styles.buttonText}
                />
              </Button>

              <Button
                style={styles.button}
                onPress={() => {
                  removeCredentials(server.url)
                  setServerList(serverList.filter(s => s.url !== server.url))
                }}
              >
                <Icon
                  accessibilityLabel={t('Remove {{serverName}}', { serverName: server.name })}
                  icon={faTimes}
                  style={styles.buttonText}
                />
              </Button>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>
            {t('No servers added')}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
export default ServerList
