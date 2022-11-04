import { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  View
} from 'react-native'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { IS_SINGLE_SERVER } from './branding/Config.js'
import {
  postLogin,
  getUsageConditions,
  getCredentials,
  getUserConfig,
  putUserConfig
} from './authentificationHelper.js'
import { styles } from './styles.js'
import WebView from './Webview.jsx'
import UpdateCredentialsModal from './modals/UpdateCredentialsModal.jsx'
import AcceptTermsOfUseModal from './modals/AcceptTermsOfUseModal.jsx'

export const ServerScreen = (props) => {
  const server = props.route.params.server

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
      setUser(user)
      setDisplayUpdateCredentialsModal(false)
    }
  }
  useEffect(() => { tryLogin() })

  const fetchTermsOfUse = async () => {
    if (termsOfUse || !user) return
    const terms = await getUsageConditions(server.url)
    setTermsOfUse(terms)
  }
  useEffect(() => { fetchTermsOfUse() }, [user])

  const fetchUserConfig = async () => {
    if (userConfig || !user) return
    const config = await getUserConfig(server.url, user.user_id)
    setUserConfig(config)
  }
  useEffect(() => { fetchUserConfig() }, [user])

  const updateUserConfig = async () => {
    if (user && userConfig) {
      await putUserConfig(server.url, user.user_id, userConfig)
    }
  }
  useEffect(() => { updateUserConfig() }, [user, userConfig])

  useEffect(() => {
    if (!user || !userConfig) return

    const areTermsOfUseAccepted = userConfig.parameters.usage_conditions__status === 'accepted'
    setDisplayAcceptTermsOfUseModal(termsOfUse && !areTermsOfUseAccepted)
    setDisplayServer(!displayUpdateCredentialsModal && (!termsOfUse || areTermsOfUseAccepted))
  }, [user, userConfig])

  return (
    <SafeAreaView style={styles.pageContainer}>
      {!displayServer && (
        <Image
          source={require('./branding/logo.png')}
          resizeMode='contain'
          style={styles.logo}
        />
      )}

      {displayUpdateCredentialsModal && (
        <UpdateCredentialsModal
          hideModal={() => {
            setDisplayUpdateCredentialsModal(false)
          }}
          currentServerURL={server.url}
          currentServerName={server.name}
          showCloseButton={false}
        />
      )}

      {displayAcceptTermsOfUseModal && (
        <AcceptTermsOfUseModal
          termsOfUse={termsOfUse}
          handleAccepted={() => {
            setUserConfig({ parameters: { ...userConfig.parameters, usage_conditions__status: 'accepted' } })
          }}
        />
      )}

      {displayServer && (
        <View style={styles.pageContainer}>
          <StatusBar />
          <WebView
            onClickGoBack={() => props.navigation.goBack()}
            screenId={props.route.params.screenId}
            url={server.url}
          />
          {!IS_SINGLE_SERVER && (
            <TouchableHighlight
              style={styles.openServerMenuButton}
              onPress={() => props.navigation.openDrawer()}
            >
              <Icon icon={faServer} />
            </TouchableHighlight>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}
export default ServerScreen
