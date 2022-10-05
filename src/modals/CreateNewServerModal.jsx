import { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'

export const CreateNewServerModal = (props) => {
  const [serverName, setServerName] = useState('')
  const [serverURL, setServerURL] = useState('')

  return (
    <CustomModal
      modalVisible={props.modalVisible}
      hideModal={props.hideModal}
      showCloseButton={props.showCloseButton}
      title='Add a new server'
    >
      <Text style={styles.label}>
        Server name
      </Text>
      <TextInput
        style={[styles.input, styles.blackText]}
        onChangeText={setServerName}
        placeholder='Server name'
      />

      <Text style={styles.label}>
        Server url
      </Text>
      <TextInput
        style={[styles.input, styles.blackText]}
        keyboardType='url'
        onChangeText={setServerURL}
        placeholder='Server url'
      />

      <Button
        style={serverName === '' || serverURL === ''
            ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
            : [styles.button, modalStyles.callToActionButton]
        }
        onPress={() => {
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

          props.onPressAdd({ name: serverName, url: serverURLWithTreatments })
          props.hideModal()
        }}
        disabled={serverName === '' || serverURL === ''}
      >
        <Text style={[styles.buttonText, { alignSelf: 'center' }]}>Add server</Text>
      </Button>
    </CustomModal>
  )
}
export default CreateNewServerModal
