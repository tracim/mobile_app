import {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  RefreshControl,
  ScrollView,
  View
} from 'react-native'
import {
  getCredentials,
  fetchCredentials,
  removeCredentials
} from './authentificationHelper.js'
import { WebView } from 'react-native-webview'
import { styles } from './styles.js'

export const Webview = (props) => {
  const [refresherEnabled, setEnableRefresher] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [httpsUrl, setHttpsUrl] = useState('')
  const [screenId, setScreenId] = useState(props.screenId)
  const [isRefLoaded, setIsRefLoaded] = useState(false)
  const webViewRef = useRef()

  useEffect(() => {
    setIsRefLoaded(true)
  }, [])

  useEffect(() => {
    if (screenId) setHttpsUrl(`https://${props.url}/ui/${screenId}`)
    else setHttpsUrl(`https://${props.url}`)
  }, [screenId])

  useEffect(() => {
    if (Platform.OS === 'android') {
      const goBackAction = () => {
        // FIXME - G.B. - 2022-10-03 - Need to include canGoBack here
        if (webViewRef.current) {
          webViewRef.current.goBack()
        } else props.onClickGoBack()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', goBackAction)

      return () => BackHandler.removeEventListener('hardwareBackPress', goBackAction)
    }
  }, [canGoBack, isRefLoaded])

  const handleNavigationStateChange = (e) => setCanGoBack(e.canGoBack)

  const handleScroll = (e) => {
    const isTopOfPage = Number(e.nativeEvent.contentOffset.y) === 0
    // FIXME - G.B. - 2022-09-30 - The refresh is disabled until the problem is fixed in Tracim.
    // The mechanism works for the page scroll as a whole, but not for a scroll on a very internal div.
    // setEnableRefresher(isTopOfPage)
  }

  const handleMessageReceived = async (actionMadeOnTracim) => {
    if (actionMadeOnTracim === 'login') {
      const credentials = await getCredentials(props.url)
      if (credentials) {
        fetchCredentials(
          props.url,
          credentials,
          () => setScreenId('recent-activities')
        )
      }
    }
    if (actionMadeOnTracim === 'logout') {
      removeCredentials(props.url)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      refreshControl={
        <RefreshControl
          enabled={refresherEnabled}
          onRefresh={() => webViewRef.current.reload()}
          refreshing={false}
        />
      }
    >
      <WebView
        onNavigationStateChange={handleNavigationStateChange}
        onScroll={handleScroll}
        ref={webViewRef}
        source={{ uri: httpsUrl }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.pageContainer}>
            <ActivityIndicator size='large' />
          </View>
        )}
        onMessage={(e) => handleMessageReceived(e.nativeEvent.data)}
      />
    </ScrollView>
  )
}
export default Webview
