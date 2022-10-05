import { useEffect, useState } from 'react'
import { View, Modal, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { modalStyles } from './modalStyles.js'

export const CustomModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible)

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
              <Pressable onPress={props.hideModal}>
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
