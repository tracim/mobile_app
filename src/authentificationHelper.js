import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '../i18next.scanner/i18n.js'

/**
 * Get the credentials from the storage
 * @param {String} serverURL 
 * @returns Null if no credentials are found, otherwise an object with the credentials \
 * {username, password}
 */
export const getCredentials = async (serverURL) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  if (serverCredentialDict && serverURL in serverCredentialDict) {
    return { username: serverCredentialDict[serverURL].username, password: serverCredentialDict[serverURL].password }
  } else {
    return null
  }
}

/**
 * Store the credentials in the storage
 * @param {String} serverURL Server URL to save the credentials for. Will be used as key.
 * @param {String} username Username to save
 * @param {String} password Password to save /!\ Password will be stored in plain text /!\
 */
export const storeCredentials = async (serverURL, username, password) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  let serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  serverCredentialDict = { ...serverCredentialDict, [serverURL]: { username, password } }
  await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
}

/**
 * Remove the credentials from the storage
 * @param {String} serverURL Server URL to delete the credentials for.
 */
export const removeCredentials = async (serverURL) => {
  const serverCredentialDictAsJSON = await AsyncStorage.getItem('credentials')
  const serverCredentialDict = JSON.parse(serverCredentialDictAsJSON)
  delete serverCredentialDict[serverURL]
  await AsyncStorage.setItem('credentials', JSON.stringify(serverCredentialDict))
}

/**
 * Try to connect to the server with the given credentials.
 * If the connection is successful, the callback function is triggered.
 * Otherwise, an error message is displayed.
 * @param {String} serverURL URL of the server
 * @param {String} credentials Credential to use for the connection
 * @param {Function} callbackFunction The function to call if the connection is successful
 */
export const fetchCredentials = async (serverURL, credentials, callbackFunction) => {
  fetch(`https://${serverURL}/api/auth/login`, {
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

/**
 * Get the ID of the current user of a specific server using cache
 * @param {String} serverURL URL of the server
 * @returns The id of the connected user
 */
export const getCurrentUserID = async (serverURL) => {
  let userId = -1

  fetch(`https://${serverURL}/api/whoami`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      userId = response.json().user_id
    } else if (response.stats === 401) {
      alert(i18n.t('User not logged in'))
    } else {
      alert(i18n.t('Something went wrong: ') + response.status)
    }
  }).catch((error) => {
    alert(i18n.t('Something went wrong: ') + error.message)
  })

  return userId
}

/**
 * Get the TOU of a specific server
 * @param {String} serverURL URL of the server
 * @returns The TOU of the server as object {title, url} or null if no TOU is available
 */
export const fetchTOU = async (serverURL) => {
  let TOU = null
  fetch(`https://${serverURL}/api/system/usage_conditions`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      // TODO:
      // We should check what is inside json()
      // items.length raise an error
      if (response.json().items.length > 0) {
        // Assuming we only have one TOU
        TOU = response.json().items[0]
      }
    } else {
      alert(i18n.t('Something went wrong: ') + response.status)
    }
  }).catch((error) => {
    alert(i18n.t('Something went wrong: ') + error.message)
  })

  return TOU
}

/**
 * Ask the server if the user has accepted the TOU
 * @param {String} serverURL URL of the server
 * @param {number} userId Id of the user
 * @returns True if the user has accepted the TOU, false otherwise
 */
export const hasAcceptedTOU = async (serverURL, userId) => {
  let hasAccepted = false
  fetch(`https://${serverURL}/api/user/${userId}/config`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      hasAccepted = response.json().parameters['usage_conditions__status'] === 'accepted'
    } else {
      alert(i18n.t('Something went wrong: ') + response.status)
    }
  }).catch((error) => {
    alert(i18n.t('Something went wrong: ') + error.message)
  })

  return hasAccepted
}