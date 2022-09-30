import { useState } from 'react'
import { View, ScrollView, FlatList, Button, Text, TextInput, SafeAreaView } from 'react-native'
import { styles } from './styles.js'

export const ServerMenu = (props) => {
  const [serverName, setServerName] = useState('')
  const [serverURL, setServerURL] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 15 }}>
      <View style={{ width: '80%', alignSelf: 'center' }}>
        <Text style={styles.blackText}>
          Add new server
        </Text>
        <Text style={styles.blackText}>
          Server name
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          onChangeText={(text) => setServerName(text)}
          placeholder="Server name"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.blackText}>
          Server url
        </Text>
        <TextInput
          style={[styles.input, styles.blackText]}
          keyboardType="url"
          onChangeText={(text) => setServerURL(text)}
          placeholder="Server url"
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
              <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  onPress={() => props.onPressServer(server.name)}
                  title={server.name}
                />
                <Button
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => props.onPressRemove(server)}
                  title='x'
                />
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>
            No servers added
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
export default ServerMenu
