import { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity as Button
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles.js'
import CreateNewServerModal from './modals/CreateNewServerModal.js'
import UpdateCredentialsModal from './modals/UpdateCredentialsModal.js'

export const ServerMenu = (props) => {
  const [displayCreateNewServerModal, setDisplayCreateNewServerModal] = useState(false)
  const [displayUpdateCredentialsModal, setDisplayUpdateCredentialsModal] = useState(false)

  const [currentServerURL, setCurrentServerURL] = useState('')
  const [currentServerName, setCurrentServerName] = useState('')

  const removeCredentials = async (serverURL) => {
    const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
    const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
    delete serverCredentialDict[serverURL]
    await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
  }

  const getCredentials = async (serverURL) => {
    const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
    const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
    if (serverCredentialDict && serverURL in serverCredentialDict) {
      return { username: serverCredentialDict[serverURL].username, password: serverCredentialDict[serverURL].password }
    } else {
      return null
    }
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        source={require('./assets/logo.png')}
        resizeMode='center'
        style={styles.logo}
      />

      <CreateNewServerModal
        modalVisible={displayCreateNewServerModal}
        hideModal={() => setDisplayCreateNewServerModal(false)}
        onPressAdd={props.onPressAdd}
      />

      <UpdateCredentialsModal
        modalVisible={displayUpdateCredentialsModal}
        hideModal={() => setDisplayUpdateCredentialsModal(false)}
        currentServerURL={currentServerURL}
        currentServerName={currentServerName}
      />

      {props.serverList.length > 0 ? (
        <ScrollView>
          {props.serverList.map(server =>
            <View
              style={styles.serverMenuItem}
              key={`button_${server.name}`}
            >
              <Button
                style={[styles.button, styles.serverMenuButton]}
                onPress={async () => {
                  const credentials = await getCredentials(server.url)
                  if (credentials) {
                    fetch('https://' + server.url + '/api/auth/login', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password
                      })
                    }).then((response) => {
                      if (response.status === 200) {
                        props.onPressServer(server.name)
                      } else {
                        alert('Wrong credentials')
                      }
                    }).catch((error) => {
                      alert('Something went wrong: ' + error.message)
                    })
                  } else {
                    setCurrentServerURL(server.url)
                    setCurrentServerName(server.name)
                    setDisplayUpdateCredentialsModal(true)
                  }
                }}
                onLongPress={() => {
                  removeCredentials(server.url)
                }}
              >
                <Text style={styles.buttonText}>
                  {server.name}
                </Text>
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  removeCredentials(server.url)
                  props.onPressRemove(server)
                }}
              >
                <Icon icon={faTimes} style={styles.buttonText} />
              </Button>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>
            No servers added
          </Text>
        </View>
      )}

      <Button
        onPress={() => setDisplayCreateNewServerModal(true)}
        style={[styles.button, styles.addNewServerButton]}
      >
        <Text style={styles.buttonText}>
          ADD A NEW SERVER
        </Text>
      </Button>
    </SafeAreaView>
  )
}
export default ServerMenu
