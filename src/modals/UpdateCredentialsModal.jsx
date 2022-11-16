import { useState } from 'react'
import { Link } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TextInput,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { postLogin, storeCredentials } from '../authentificationHelper.js'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'

export const UpdateCredentialsModal = (props) => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <CustomModal
      hideModal={props.goBackToHomePage}
      modalVisible={props.modalVisible}
      showCloseButton={props.showCloseButton}
      title={t('Add credentials for {{currentServerName}}', {
        currentServerName: props.currentServerName
      })}
    >
      <Text style={styles.label}>
        {t('Email or username')}
      </Text>
      <TextInput
        style={[styles.input, styles.blackText]}
        keyboardType='email-address'
        onChangeText={setUsername}
        placeholder={t('Email or username')}
      />

      <Text style={styles.label}>
        {t('Password')}
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
        {t('Forgot password')}
      </Link>

      <Button
        style={username === '' || password === ''
          ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
          : [styles.button, modalStyles.callToActionButton]
        }
        onPress={async () => {
          const user = await postLogin(props.currentServerURL, { username, password })
          if (user) {
            await storeCredentials(props.currentServerURL, username, password)
            props.hideModal()
          }
        }}
        disabled={username === '' || password === ''}
      >
        <Text style={styles.buttonText}>{t('Connect')}</Text>
      </Button>
    </CustomModal>
  )
}
export default UpdateCredentialsModal
