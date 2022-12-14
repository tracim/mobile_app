import { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { useTranslation } from 'react-i18next'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity as Button
} from 'react-native'
import {
  removeCredentials
} from './authentificationHelper.js'
import { styles } from './styles.js'
import CreateNewServerModal from './modals/CreateNewServerModal.jsx'

export const MultipleServerMenu = (props) => {
  const { t } = useTranslation()
  const [displayCreateNewServerModal, setDisplayCreateNewServerModal] = useState(false)

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        source={require('./branding/logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />

      <CreateNewServerModal
        modalVisible={displayCreateNewServerModal}
        hideModal={() => setDisplayCreateNewServerModal(false)}
        onPressAdd={props.onPressAdd}
        showCloseButton
      />

      {props.serverList.length > 0 ? (
        <ScrollView>
          {props.serverList.map(server =>
            <View
              style={styles.serverMenuItem}
              key={`button_${server.name}`}
            >
              <Button
                style={[styles.button, styles.serverMenuButton]}
                onPress={() => props.onPressServer(server)}
                onLongPress={() => {
                  removeCredentials(server.url)
                }}
              >
                <Text style={styles.buttonText}>
                  {server.name}
                </Text>
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  removeCredentials(server.url)
                  props.onPressRemove(server)
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

      <Button
        onPress={() => setDisplayCreateNewServerModal(true)}
        style={[styles.button, styles.addNewServerButton]}
      >
        <Text style={styles.buttonText}>
          {t('ADD A NEW SERVER')}
        </Text>
      </Button>
    </SafeAreaView>
  )
}
export default MultipleServerMenu
