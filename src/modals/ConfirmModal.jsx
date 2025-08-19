import { useState, useEffect } from 'react'
import {
  Text,
  TouchableOpacity as Button,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { CustomModal } from './CustomModal.jsx'
import { styles } from '../styles.js'
import { modalStyles } from './modalStyles.js'

export const ConfirmModal = (props) => {
  const { t } = useTranslation()
  return (
    <CustomModal
      modalVisible={props.isVisible}
      showCloseButton
      title={t('Are you sure?')}
      hideModal={() => { props.onClose() }}
    >
      <View style={[modalStyles.buttonList]}>
        <Button
          style={[styles.button]}
          onPress={() => { props.onClose() }}
        >
          <Text style={[styles.buttonText]}>
            {t('Cancel')}
          </Text>
        </Button>

        <Button
          style={[styles.button, styles.bgColorPrimary]}
          onPress={() => {
            props.onConfirm()
            props.onClose()
          }}
        >
          <Text style={[styles.buttonText]}>
            {t('Confirm')}
          </Text>
        </Button>
      </View>
    </CustomModal>
  )
}
export default ConfirmModal
