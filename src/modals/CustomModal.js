import { useEffect, useState } from 'react'
import { View, Modal, Text, Pressable } from 'react-native'
import { styles } from '../styles.js'

export const CustomModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible)

  useEffect(() => {
    setModalVisible(props.modalVisible)
  }, [props.modalVisible])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={props.hideModal}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
      }}>
        <View style={{
          margin: 10,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
            <Text style={[{ textAlign: 'left', fontSize: 18 }, styles.blackText]}>
              {props.title}
            </Text>

            <Pressable
              onPress={props.hideModal}
            >
              <Text style={[{ fontSize: 16 }, styles.blackText]}>
                X
              </Text>
            </Pressable>
          </View>
          {props.children}
        </View>
      </View>
    </Modal>
  )
}