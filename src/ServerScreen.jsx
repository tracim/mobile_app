import { useEffect, useState } from 'react'
import {
  Image,
  StatusBar,
  Pressable,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
import { IS_SINGLE_SERVER } from '../assets/branding/Config.js'
import {
  postLogin,
  getUsageConditions,
  getCredentials,
  getUserConfig,
  putUserConfig
} from './authentificationHelper.js'
import { useServerList } from './ServerListContext.js'
import { styles } from './styles.js'
import TracimWebView from './TracimWebview.jsx'
import UpdateCredentialsModal from './modals/UpdateCredentialsModal.jsx'
import AcceptTermsOfUseModal from './modals/AcceptTermsOfUseModal.jsx'


export const ServerScreen = (props) => {
  const navigation = useNavigation()

  const [serverList, setServerList] = useServerList()
  const server = serverList.find(s => s.url === props.route.name)

  const isFocused = useIsFocused()

  const [displayUpdateCredentialsModal, setDisplayUpdateCredentialsModal] = useState(false)
  const [displayAcceptTermsOfUseModal, setDisplayAcceptTermsOfUseModal] = useState(false)
  const [displayServer, setDisplayServer] = useState(false)

  const [user, setUser] = useState(null)
  const [userConfig, setUserConfig] = useState(null)
  const [termsOfUse, setTermsOfUse] = useState(null)

  const tryLogin = async () => {
    if (user) return
    const credentials = await getCredentials(server.url)

    if (!credentials) {
      setDisplayUpdateCredentialsModal(true)
    } else {
      const user = await postLogin(server.url, credentials)
      if (user === null) {
        setDisplayUpdateCredentialsModal(true)
        return
      }
      setUser(user)
      setDisplayUpdateCredentialsModal(false)
    }
  }

  useEffect(() => {
    tryLogin()
  }, [])

  useEffect(() => {
    if (isFocused) {
      tryLogin()
    }
  }, [isFocused, displayUpdateCredentialsModal])

  const fetchTermsOfUse = async () => {
    if (termsOfUse || !user) return
    const terms = await getUsageConditions(server.url)
    setTermsOfUse(terms)
  }
  const fetchUserConfig = async () => {
    if (userConfig || !user) return
    const config = await getUserConfig(server.url, user.user_id)
    setUserConfig(config)
  }
  useEffect(() => {
    fetchTermsOfUse()
    fetchUserConfig()
  }, [user])

  const updateUserConfig = async () => {
    if (user && userConfig) {
      await putUserConfig(server.url, user.user_id, userConfig)
    }
  }
  useEffect(() => {
    updateUserConfig()
  }, [user, userConfig])

  useEffect(() => {
    if (!user || !userConfig) return

    const areTermsOfUseAccepted = userConfig.parameters.usage_conditions__status === 'accepted'
    setDisplayAcceptTermsOfUseModal(termsOfUse && !areTermsOfUseAccepted)
    setDisplayServer(!displayUpdateCredentialsModal && (!termsOfUse || areTermsOfUseAccepted))
  }, [user, userConfig, displayUpdateCredentialsModal])

  return (
    <SafeAreaView style={styles.pageContainer}>
      {!displayServer && (
        <Image
          source={require('../assets/branding/logo.png')}
          resizeMode='contain'
          style={styles.logo}
        />
      )}

      <UpdateCredentialsModal
        currentServerURL={server.url}
        currentServerName={server.name}
        goBackToHomePage={() => navigation.navigate('Home', { allowRedirect: false })}
        hideModal={() => setDisplayUpdateCredentialsModal(false)}
        modalVisible={displayUpdateCredentialsModal}
        showCloseButton={!IS_SINGLE_SERVER}
      />

      <AcceptTermsOfUseModal
        handleAccepted={() => {
          setUserConfig({ parameters: { ...userConfig.parameters, usage_conditions__status: 'accepted' } })
        }}
        modalVisible={displayAcceptTermsOfUseModal}
        termsOfUse={termsOfUse}
      />

      {displayServer && (
        <View style={styles.pageContainer}>
          <StatusBar barStyle='default' />

          <TracimWebView
            onClickGoBack={() => navigation.goBack()}
            screenId={props.route?.params?.screenId}
            url={server.url}
          />

          {!IS_SINGLE_SERVER && (
            <Pressable
              style={styles.openServerMenuButton}
              onPress={() => navigation.openDrawer()}
            >
              <Icon icon={faServer} />
            </Pressable>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}
export default ServerScreen
