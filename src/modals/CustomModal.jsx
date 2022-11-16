import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Modal, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { modalStyles } from './modalStyles.js'
import { useTranslation } from 'react-i18next'

export const CustomModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setModalVisible(props.modalVisible)
  })

  // INFO - G.B. - 2022-11-16 - In React Native Navigation the life cycle works a bit
  // differently than in React, the elements are not actually unmounted. The function below
  // simulates a "componentDidUnmount" to clear the state and return to the initial value.
  // See more at https://reactnavigation.org/docs/navigation-lifecycle/
  useFocusEffect(
    useCallback(() => {
      return () => setModalVisible(false)
    }, [])
  )

  return (
    <Modal
      animationType='fade'
      onRequestClose={() => {
        setModalVisible(false)
        props.hideModal()
      }}
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
                onPress={() => {
                  setModalVisible(false)
                  props.hideModal()
                }}
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
  modalVisible: false,
  showCloseButton: true
}
