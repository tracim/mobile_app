import { useState } from 'react'
import { Link } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TouchableOpacity as Button
} from 'react-native'
import { CustomModal } from './CustomModal.jsx'
import { fetchCredentials, storeCredentials } from '../authentificationHelper.js'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'
import BouncyCheckbox from "react-native-bouncy-checkbox"

export const AcceptTOUModal = (props) => {
  const { t } = useTranslation()

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

      <Link
        to={props.TOU.url}
        style={styles.link}
      >
        {t('Terms of use')}
      </Link>

      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="I've read and accept the terms of use"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={(isChecked) => {}}
      />

      <Button
        style={true
          ? [styles.button, styles.buttonDisabled, modalStyles.callToActionButton]
          : [styles.button, modalStyles.callToActionButton]
        }
        disabled={true}
      >
        <Text style={styles.buttonText}>{t('Validate')}</Text>
      </Button>
    </CustomModal>
  )
}
export default AcceptTOUModal
