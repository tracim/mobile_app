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
 * An error message is displayed in case of login failure.
 * @param {String} serverURL URL of the server
 * @param {String} credentials Credential to use for the connection
 * @return {Object} Object representing the user of null if login failed
 */
export const postLogin = async (serverURL, credentials) => {
  try {
    const response = await fetch(`https://${serverURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    if (response.status === 200) {
      return await response.json()
    } else {
      alert(i18n.t('Wrong credentials'))
    }
  } catch (error) {
    alert(i18n.t('Something went wrong: ') + error.message)
  }
  return null
}

/**
 * Get the usage conditions of a given server
 * @param {String} serverURL URL of the server
 * @returns The usage conditions of the server as object {title, url} or null if no condition is available
 */
export const getUsageConditions = async (serverURL) => {
  try {
    const response = await fetch(`https://${serverURL}/api/system/usage_conditions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      const body = await response.json()
      if (body.items.length > 0) {
        // Assuming we only have one usage condition
        return body.items[0]
      }
    } else {
      alert(i18n.t('Something went wrong: ') + response.status)
    }

  } catch (error) {
    alert(i18n.t('Something went wrong: ') + error.message)
  }
  return null
}

export const getUserConfig = async (serverURL, userId) => {
  try {
    const response = await fetch(`https://${serverURL}/api/users/${userId}/config`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      return await response.json()
    } else {
      alert(i18n.t('Something went wrong: ') + response.status)
    }
  }
  catch (error) {
    alert(i18n.t('Something went wrong: ') + error.message)
  }
  return null
}

export const putUserConfig = async (serverURL, userId, config) => {
  try {
    const response = await fetch(`https://${serverURL}/api/users/${userId}/config`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    })
    if (!response.ok) {
      alert(i18n.t('Something went wrong: ') + response.status)
    }
  }
  catch (error) {
    alert(i18n.t('Something went wrong: ') + error.message)
  }
}
