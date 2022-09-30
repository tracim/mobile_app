import { useState } from 'react'
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles.js'

import { CustomModal } from './modals/CustomModal.js'

export const ServerMenu = (props) => {
  // Used to add a new server
  const [serverName, setServerName] = useState('')
  const [serverURL, setServerURL] = useState('')

  // Used to add a new credentials to a server
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Used to connect to the server
  const [currentServerURL, setCurrentServerURL] = useState('')
  const [currentServerName, setCurrentServerName] = useState('')

  // Used to display the modals
  const [addServerModalVisible, setAddServerModalVisible] = useState(false)
  const [addCredentialsModalVisible, setAddCredentialsModalVisible] = useState(false)

  const removeCredentials = async (serverURL) => {
    const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
    const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
    delete serverCredentialDict[serverURL]
    await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
  }

  const storeCredentials = async (serverURL, username, password) => {
    const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
    let serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
    serverCredentialDict = { ...serverCredentialDict, [serverURL]: { username, password } }
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
    <SafeAreaView style={{ flex: 1, marginTop: 15 }}>

      {/* Modal to create a new server */}
      <CustomModal
        modalVisible={addServerModalVisible}
        hideModal={() => setAddServerModalVisible(false)}
        title="Add a new server"
      >
        <Text style={[{ textAlign: 'left' }, styles.blackText]}>
          Server name
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          onChangeText={(text) => setServerName(text)}
          placeholder='Server name'
          placeholderTextColor={'gray'}
        />
        <Text style={[{ textAlign: 'left' }, styles.blackText]}>
          Server url
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          keyboardType='url'
          onChangeText={(text) => setServerURL(text)}
          placeholder='Server url'
          placeholderTextColor={'gray'}
        />
        <Pressable
          style={[{
            borderRadius: 5,
            marginTop: 15,
            padding: 10,
            elevation: 2
          }, {
            backgroundColor: serverName === '' || serverURL === ''
              ? "gray"
              : "#2196F3",
          }]}
          onPress={() => {
            // Either that or to ask the complete full URL
            let serverURLWithTreatments = serverURL
            // Remove the https:// if it exists
            serverURLWithTreatments = serverURLWithTreatments.startsWith("https://")
              ? serverURLWithTreatments.substring(8)
              : serverURLWithTreatments
            // Remove the http:// if it exists
            serverURLWithTreatments = serverURLWithTreatments.startsWith("http://")
              ? serverURLWithTreatments.substring(7)
              : serverURLWithTreatments
            // Remove the last / if it exists
            serverURLWithTreatments = serverURLWithTreatments.endsWith("/")
              ? serverURLWithTreatments.substring(0, serverURLWithTreatments.lastIndexOf("/") + 1)
              : serverURLWithTreatments

            props.onPressAdd({ name: serverName, url: serverURLWithTreatments })
            setAddServerModalVisible(false)
          }}
          disabled={serverName === '' || serverURL === ''}
        >
          <Text style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          }}>Add server</Text>
        </Pressable>
      </CustomModal>

      {/* Modal to update credentials */}
      <CustomModal
        modalVisible={addCredentialsModalVisible}
        hideModal={() => setAddCredentialsModalVisible(false)}
        title={"Add credentials for " + currentServerName}
      >
        <Text style={[{ textAlign: 'left' }, styles.blackText]}>
          Email or username
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          keyboardType="email-address"
          onChangeText={(text) => setUsername(text)}
          placeholder="Email or username"
          placeholderTextColor={'gray'}
        />
        <Text style={[{ textAlign: 'left' }, styles.blackText]}>
          Password
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          onChangeText={(text) => setPassword(text)}
          placeholder="********"
          placeholderTextColor={'gray'}
          secureTextEntry={true}
        />
        <Pressable
          style={[{
            borderRadius: 5,
            marginTop: 15,
            padding: 10,
            elevation: 2
          }, {
            backgroundColor: username === '' || password === ''
              ? "gray"
              : "#2196F3",
          }]}
          onPress={() => {
            fetch('https://' + currentServerURL + '/api/auth/login', {
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
                setAddCredentialsModalVisible(false)
                storeCredentials(currentServerURL, username, password)
              } else {
                alert('Wrong credentials, can\'t save it')
              }
            }).catch((error) => {
              alert('Something went wrong: ' + error.message)
            })
          }}
          disabled={username === '' || password === ''}
        >
          <Text style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          }}>Connect</Text>
        </Pressable>
      </CustomModal>

      <View style={{ marginStart: 15, marginEnd: 15 }}>
        <Button
          onPress={() => setAddServerModalVisible(true)}
          title='Add a server'
        />
      </View>

      {props.serverList.length > 0 ? (
        <ScrollView>
          {props.serverList.map(server =>
            <View
              style={[styles.serverMenuButton]}
              key={`button_${server.name}`}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    borderRadius: 5,
                    padding: 10,
                    paddingHorizontal: 15,
                    elevation: 2
                  }, {
                    backgroundColor: pressed
                      ? "gray"
                      : "#2196F3",
                  }
                ]}
                onPress={async () => {
                  const credentials = await getCredentials(server.url)
                  if (credentials) {
                    // alert('Credentials found: ' + credentials.username + ' ' + credentials.password)
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
                    setAddCredentialsModalVisible(true)
                  }
                }}
                onLongPress={() => {
                  removeCredentials(server.url)
                  // alert('Credentials have been removed for ' + server.name)
                }}
              >
                <Text style={[{ fontSize: 14, color: 'white' }]}>
                  {server.name}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    borderRadius: 5,
                    padding: 10,
                    paddingHorizontal: 15,
                    elevation: 2,
                    alignSelf: 'flex-end'
                  }, {
                    backgroundColor: pressed
                      ? "gray"
                      : "#2196F3",
                  }
                ]}
                onPress={() => {
                  removeCredentials(server.url)
                  props.onPressRemove(server)
                }}
              >
                <Text style={[{ fontSize: 14, color: 'white' }]}>
                  X
                </Text>
              </Pressable>
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
    </SafeAreaView>
  )
}
export default ServerMenu
