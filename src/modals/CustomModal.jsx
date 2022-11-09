import { useEffect, useState } from 'react'
import { View, Modal, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { modalStyles } from './modalStyles.js'
import { useTranslation } from 'react-i18next'

export const CustomModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible)
  const { t } = useTranslation()

  useEffect(() => {
    setModalVisible(props.modalVisible)
  }, [props.modalVisible])

  return (
    <Modal
      animationType='fade'
      onRequestClose={props.hideModal}
      transparent
      visible={modalVisible}
    >
      <View style={modalStyles.container}>
        <View style={modalStyles.modal}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>
              {props.title}
            </Text>
            {props.showCloseButton && (
              <Pressable
                accessibilityLabel={t('Close')}
                onPress={props.hideModal}
                style={modalStyles.closeButton}
              >
                <Icon icon={faTimes} />
              </Pressable>
            )}
          </View>
          {props.children}
        </View>
      </View>
    </Modal>
  )
}

PropTypes.defaultProps = {
  hideModal: () => { },
  showCloseButton: true
}
