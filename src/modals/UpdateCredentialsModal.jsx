import { useState } from 'react'
import { Link } from '@react-navigation/native'
import {
  Text,
  TextInput,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { fetchCredentials, storeCredentials } from '../authentificationHelper.js'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'

export const UpdateCredentialsModal = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <CustomModal
      modalVisible={props.modalVisible}
      hideModal={props.hideModal}
      showCloseButton={props.showCloseButton}
      title={'Add credentials for ' + props.currentServerName}
    >
      <Text style={styles.label}>
        Email or username
      </Text>
      <TextInput
        style={[styles.input, styles.blackText]}
        keyboardType='email-address'
        onChangeText={setUsername}
        placeholder='Email or username'
      />

      <Text style={styles.label}>
        Password
      </Text>
      <TextInput
        style={[styles.input, styles.blackText]}
        onChangeText={setPassword}
        placeholder='********'
        secureTextEntry
      />

      <Link
        to={{
          screen: props.currentServerName,
          params: { screenId: 'forgot-password' }
        }}
        onPress={props.hideModal}
        style={styles.link}
      >
        Forgot password
      </Link>

      <Button
        style={username === '' || password === ''
          ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
          : [styles.button, modalStyles.callToActionButton]
        }
        onPress={() => {
          fetchCredentials(
            props.currentServerURL,
            { username, password },
            () => {
              props.hideModal()
              storeCredentials(props.currentServerURL, username, password)
            }
          )
        }}
        disabled={username === '' || password === ''}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </Button>
    </CustomModal>
  )
}
export default UpdateCredentialsModal
