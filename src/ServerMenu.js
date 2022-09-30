import { useState } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'
import { styles } from './styles.js'

export const ServerMenu = (props) => {
  const [serverName, setServerName] = useState('')
  const [serverURL, setServerURL] = useState('')

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.newServerForm}>
        <Text style={styles.blackText}>
          Add new server
        </Text>
        <Text style={styles.blackText}>
          Server name
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          onChangeText={(text) => setServerName(text)}
          placeholder='Server name'
          placeholderTextColor={'gray'}
        />
        <Text style={styles.blackText}>
          Server url
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          keyboardType='url'
          onChangeText={(text) => setServerURL(text)}
          placeholder='Server url'
          placeholderTextColor={'gray'}
        />
        <View style={styles.addNewServerButton}>
          <Button
            onPress={() => props.onPressAdd({ name: serverName, url: serverURL })}
            disabled={serverName === '' || serverURL === ''}
            title='+'
          />
        </View>
      </View>

      {props.serverList.length > 0 ? (
        <ScrollView>
          {props.serverList.map(server =>
            <View
              style={[styles.serverMenuButton]}
              key={`button_${server.name}`}
            >
              <Button
                onPress={() => props.onPressServer(server.name)}
                title={server.name}
              />
              <Button
                onPress={() => props.onPressRemove(server)}
                title='x'
              />
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
