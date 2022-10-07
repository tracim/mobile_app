import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '../i18next.scanner/i18n.js'

export const getCredentials = async (serverURL) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  if (serverCredentialDict && serverURL in serverCredentialDict) {
    return { username: serverCredentialDict[serverURL].username, password: serverCredentialDict[serverURL].password }
  } else {
    return null
  }
}

export const storeCredentials = async (serverURL, username, password) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  let serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  serverCredentialDict = { ...serverCredentialDict, [serverURL]: { username, password } }
  await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
}

export const removeCredentials = async (serverURL) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  delete serverCredentialDict[serverURL]
  await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
}

export const fetchCredentials = async (serverURL, credentials, callbackFunction) => {
  fetch('https://' + serverURL + '/api/auth/login', {
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
      callbackFunction()
    } else {
      alert(i18n.t('Wrong credentials'))
    }
  }).catch((error) => {
    alert(i18n.t('Something went wrong: ') + error.message)
  })
}
