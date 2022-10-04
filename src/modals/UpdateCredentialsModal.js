import { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity as Button
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CustomModal } from './CustomModal.js'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'

export const UpdateCredentialsModal = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const storeCredentials = async (serverURL, username, password) => {
    const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
    let serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
    serverCredentialDict = { ...serverCredentialDict, [serverURL]: { username, password } }
    await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
  }

  return (
    <CustomModal
      modalVisible={props.modalVisible}
      hideModal={props.hideModal}
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

      <Button
        style={username === '' || password === ''
          ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
          : [styles.button, modalStyles.callToActionButton]
        }
        onPress={() => {
          fetch('https://' + props.currentServerURL + '/api/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }).then((response) => {
            if (response.status === 200) {
              props.hideModal()
              storeCredentials(props.currentServerURL, username, password)
            } else {
              alert('Wrong credentials, can\'t save it')
            }
          }).catch((error) => {
            alert('Something went wrong: ' + error.message)
          })
        }}
        disabled={username === '' || password === ''}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </Button>
    </CustomModal>
  )
}
export default UpdateCredentialsModal
