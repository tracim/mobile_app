import { useState } from 'react'
import { Link } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  Linking,
  Text,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export const AcceptTermsOfUseModal = (props) => {
  const { t } = useTranslation()

  const [ accepted, setAccepted ]  = useState(false)

  return (
    <CustomModal
      modalVisible={props.modalVisible}
      hideModal={props.hideModal}
      showCloseButton={props.showCloseButton}
      title={t('Terms of use {{currentServerName}}', {
        currentServerName: props.currentServerName
      })}
    >
      <Text style={styles.label}>
        {t('Please read and accept the terms of use of the server to be able to connect.')}
      </Text>

      <Text
        style={styles.link}
	onPress={async () => { await Linking.openURL(props.termsOfUse.url)}}
      >
        {t('Terms of use')}
      </Text>

      <BouncyCheckbox
        size={25}
        text={t('I\'ve read and accept the terms of use')}
        onPress={setAccepted}
      />

      <Button
        style={accepted ? [styles.button, modalStyles.callToActionButton] : [styles.button, modalStyles.callToActionButton, styles.buttonDisabled]}
	disabled={!accepted}
	onPress={props.handleAccepted}
      >
        <Text style={styles.buttonText}>{t('Validate')}</Text>
      </Button>
    </CustomModal>
  )
}
export default AcceptTermsOfUseModal
