import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TextInput,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'
import { useServerList } from '../ServerListContext.js'
import { getB64Favicon } from '../util.js'
import { removeCredentials } from '../authentificationHelper.js'

export const SetServerModal = (props) => {
  const { t } = useTranslation()
  const [serverList, setServerList] = useServerList()

  const [serverName, setServerName] = useState(props.isCreate ? '' : props.serverToUpdate.name)
  const [serverURL, setServerURL] = useState(props.isCreate ? '' : props.serverToUpdate.url)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <CustomModal
      modalVisible={props.modalVisible}
      hideModal={props.hideModal}
      showCloseButton={props.showCloseButton}
      title={t('Add a new server')}
    >
      <Text style={styles.label} accessibilityElementsHidden importantForAccessibility='no-hide-descendants'>
        {t('Server name')}
      </Text>
      <TextInput
        onChangeText={setServerName}
        placeholder={t('My Domain')}
        defaultValue={props.isCreate ? undefined : props.serverToUpdate.name}
        placeholderTextColor={'#999'}
        style={[styles.input, styles.blackText]}
      />

      <Text style={styles.label} accessibilityElementsHidden importantForAccessibility='no-hide-descendants'>
        {t('Server URL')}
      </Text>
      <TextInput
        keyboardType='url'
        onChangeText={setServerURL}
        placeholder='https://mytracimdomain.org'
        defaultValue={props.isCreate ? undefined : props.serverToUpdate.url}
        placeholderTextColor={'#999'}
        autoCapitalize='none'
        style={[styles.input, styles.blackText]}
      />

      {errorMessage !== '' && (
        <Text style={[styles.errorMessage, { fontSize: 12 }]}>
          {errorMessage}
        </Text>
      )}

      <Button
        style={serverName === '' || serverURL === ''
          ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
          : [styles.button, modalStyles.callToActionButton]
        }
        onPress={async () => {
          // INFO - M.P. - 2022-09-30 - Either that or to ask the complete full URL
          let serverURLWithTreatments = serverURL
          // INFO - M.P. - 2022-09-30 - Remove the https:// if it exists
          serverURLWithTreatments = serverURLWithTreatments.startsWith('https://')
            ? serverURLWithTreatments.substring(8)
            : serverURLWithTreatments
          // INFO - M.P. - 2022-09-30 - Remove the http:// if it exists
          serverURLWithTreatments = serverURLWithTreatments.startsWith('http://')
            ? serverURLWithTreatments.substring(7)
            : serverURLWithTreatments
          // INFO - M.P. - 2022-09-30 - Remove the last / if it exists
          serverURLWithTreatments = serverURLWithTreatments.endsWith('/')
            ? serverURLWithTreatments.substring(0, serverURLWithTreatments.lastIndexOf('/') + 1)
            : serverURLWithTreatments

          try {
            const faviconB64 = await getB64Favicon(serverURLWithTreatments)

            const newServer = {
              name: serverName,
              url: serverURLWithTreatments,
              iconB64: faviconB64 || ''
            }

            if (props.isCreate === true) {
              setServerList([...serverList, newServer])
            } else {
              if (props.serverToUpdate.url !== serverURLWithTreatments) {
                removeCredentials(props.serverToUpdate.url)
              }

              setServerList(serverList.map(
                server => server.name === props.serverToUpdate.name ? newServer : server)
              )
            }

            props.hideModal()
          } catch (e) {
            console.error('Error in onPress of SetServerModal', e)
            setErrorMessage(t('Error, please check the server URL and try again.'))
          }
        }}
        disabled={serverName === '' || serverURL === ''}
      >
        <Text style={[styles.buttonText, { alignSelf: 'center' }]}>
          {props.isCreate ? t('Add server') : t('Update server')}
        </Text>
      </Button>
    </CustomModal>
  )
}
export default SetServerModal
